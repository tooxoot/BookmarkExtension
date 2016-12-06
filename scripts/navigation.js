
/**
 * Populates the node array.
 * 
 * @param root The root of the tree.
 */
function buildNodeArray(root) {
  buildNodeArrayREC(root); 
  console.log(nodeArray);  
}
/**
 * Recursive part of 'buildNodeArray'.
 * 
 * @param currentNode The cuuren bookmark.
 */
function buildNodeArrayREC(currentNode) {
  nodeArray.push(currentNode);
  if(notNU(currentNode.children)){
    currentNode.children.forEach(function (child) {
      buildNodeArrayREC(child);
    });
  }
}

/**
 * Gets a specific Node from the node array. Searches for specific id or title.
 * 
 * @param id The id for wich the array is searched. 
 * @param title 
 * @returns Bookmark/folder node matching given id/title.
 */
function getNode(id, title){
  var out = null;
  nodeArray.some(function (node) {
    if(id && node.id == id || title && node.title == title) out = node;
    return out !== null;
  });
  return out;
}

/**
 * Searches all titles and urls from the Nodes in the node array for the given phrase.
 * This searchmethod is not case sensitive. Results are sorted into the arrays: 'folders', 'titles' and 'urls'.
 * 
 * @param phrase The phrase this method searches for.
 */
function searchPhrase(phrase) {
  folders = [];
  titles = [];
  urls = [];
  var regex = new RegExp(phrase, 'i');
  nodeArray.forEach(function (node) {
    if(node.id != 0 && node.title.search(regex) > -1)
      if(node.url) titles.push(node);
      else folders.push(node);
    if(node.url && node.url.search(regex) > -1) urls.push(node);
  });
  folders.sort(function (nodeA, nodeB) { 
    if( nodeA.title.toLowerCase() > nodeB.title.toLowerCase() ) return 1;
    else return -1; 
  });
  titles.sort(function (nodeA, nodeB) { 
    if( nodeA.title.toLowerCase() > nodeB.title.toLowerCase() ) return 1;
    else return -1; 
  });
  urls.sort(function (nodeA, nodeB) { 
    if( nodeA.url.toLowerCase() > nodeB.url.toLowerCase() ) return 1;
    else return -1; 
  });
}

/**
 * Handles the 'keydown' event on the popup.
 */
function keydownHandler() {
  switch(event.keyCode){
    case 8:
      if(!searchFocus) goBack();
      break;
    case 9:
      event.preventDefault();
      if(searchFocus){
        document.getElementById("searchBar").blur();
        colorSelCurrent();
      } else document.getElementById("searchBar").focus();
      break;
    case 13:
      document.getElementById("searchBar").blur();
      pressEnter();
      break;
    case 38:
      document.getElementById("searchBar").blur();
      scrollSelected(-1);
      break; 
    case 40:
      document.getElementById("searchBar").blur();
      scrollSelected(1);
      break;
    default: 
      document.getElementById("searchBar").focus();
  }
}

/**
 * This Method handles the 'click' event and is also executed if enter was pressed.
 */
function pressEnter() {
  event.preventDefault();
  if(currentDiv == 0){
    goBack();
    return
  }
  var selected = document.getElementById(TITLE_ID + currentDiv);
  var selID = selected.getAttribute('markId');
  var url = selected.getAttribute('url');
  if(event.ctrlKey || event.button == 1) {
    if(url  !== 'undefined') openNewTabs([url]);
    else openChildrenUrls(selID);
  }else if (event.shiftKey){
   if(url !== 'undefined') chrome.windows.create({url: url});
   else openChildrenUrls(selID, true);
  }else {
    if(url !== 'undefined') chrome.tabs.query({active: true}, function (tabs) {
      chrome.tabs.update({url: url});
    });
    else {
          fillBody(selID);
    }
  }
}

/**
 * Handles the 'mouseover' event on the bookmark/folder divs.
 * 
 * @param div (description)
 */
function mouseoverBMDiv(div) {
  if(currentDiv !== null && currentDiv !== undefined) colorUnselCurrent();
  currentDiv = parseInt(event.target.getAttribute('id').split('_')[1]);
  colorSelCurrent();
}

/**
 * Handles the 'mouseout' event on the bookmark/folder divs.
 */
function mouseoutBMDiv() {
  colorUnselCurrent();
}

/**
 * Handles the 'focusin' event on the searchbar.
 */
function searchbarFIN() {
  event.target.value = '';
  event.target.style.border = '1px solid darkgray';
  searchFocus = true;
}

/**
 * Handles the 'focusout' event on the searchbar.
 */
function searchbarFOUT() {
  event.target.style.border = 'none';
  searchFocus = false;
}

/**
 * Handles the 'input' event on the searchbar.
 */
function searchbarInput() {
  searchPhrase(event.target.value)
  fillBodyFromSearch()
}

/**
 * This method is executed if up or down was pressed.
 * Depending on the sign parameter it moves the selection up or down.
 * 
 * @param sign Insert 1 to move the selection downwards and -1 to move it upwards.
 */
function scrollSelected(sign) {
  event.preventDefault();
  if(currentDiv == null || currentDiv == undefined){
    currentDiv = 1;
    colorSelCurrent();
  }else {
    colorUnselCurrent();
    currentDiv += sign * 1;
    if(currentDiv < 0) currentDiv = BMindex - 1;
    if(currentDiv >= BMindex) currentDiv = 0;
    colorSelCurrent();
  }
  document.getElementById(URL_ID + currentDiv).scrollIntoView(false);
  if(document.body.scrollTop != 0)document.body.scrollTop += 20;
}

/**
 * Sets the current path to the current node's parent id.
 */
function goBack() {
  if(state == STATE_SEARCH) fillBody(getNode(currentPath).id); 
  else if(currentPath == 0) return;
  else fillBody(getNode(currentPath).parentId);
}

/**
 * Creates new tab for each of the urls defined in the given array.
 * If window id is not set the tabs are opened in the current window. 
 * 
 * @param urls Array of urls
 * @param windowid (optional)Id of the window in wich the tabs are opened.
 */
function openNewTabs(urls, windowid) {
  urls.forEach(function (url) {
    chrome.tabs.create({ windowId: windowid || chrome.windows.WINDOW_ID_CURRENT, active: false, url: url});
  });
}

/**
 * Opens all the bookmarks wich are present in the folder defined by parentID. 
 * 
 * @param parentID The folder's id  
 * @param newWindow Defines if the tabs are opened in a new window. 
 */
function openChildrenUrls(parentID, newWindow){
  var parent = getNode(parentID); 
    var urls = [];
    if(notNU(parent.children)) 
      parent.children.forEach(function (child) {
        if(notNU(child) && child.url) urls.push(child.url);
      })
    if(urls.length > 5){
      var comfirmed = confirm('open ' + urls.length + ' Tabs?')
      if(!comfirmed) return;
    }
    if(newWindow) chrome.windows.create({url: urls.pop()}, function (window) {
       openNewTabs(urls, window.id);
      });
    else openNewTabs(urls);
}
