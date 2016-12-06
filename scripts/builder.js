/**
 * Populates the popup with searchresults
 */
function fillBodyFromSearch() {
  state = STATE_SEARCH;
  clearBody();
  backTitle = 'Escape';
  createBackIconDiv();
  createBackTitleDiv();
  createBackUrlDiv();
  BMindex += 1;
  createHrDiv('-Matching Folders-', 1);
  folders.forEach(createBMDiv);
  document.getElementById(HR_URL_ID + 1).innerHTML = '> ' + folders.length;
  createHrDiv('-Matching Titles-', 2);
  titles.forEach(createBMDiv);
  document.getElementById(HR_URL_ID + 2).innerHTML = '> ' + titles.length;
  createHrDiv('-Matching Urls-', 3);
  urls.forEach(createBMDiv);
  document.getElementById(HR_URL_ID + 3).innerHTML = '> ' + urls.length;
  document.getElementById('titles').appendChild(fillDiv);
  colorSelCurrent();
}

/**
 * Populates the popup from current folder
 *
 * @param id The folder's bookmark id
 */
function fillBody(id) {
  currentPath = id;
  state = STATE_NORMAL;
  clearBody();
  var node = getNode(id);
  if(currentPath != 0){
    backTitle = node.title;
    createBackIconDiv();
    createBackTitleDiv();
    createBackUrlDiv();
  }
  BMindex += 1;
  createBMDivs(node);
  createHrDiv('-Folders-', 1);
  folders.forEach(createBMDiv);
  document.getElementById(HR_URL_ID + 1).innerHTML = '> ' + folders.length;
  createHrDiv('-Bookmarks-', 2);
  titles.forEach(createBMDiv);
  document.getElementById(HR_URL_ID + 2).innerHTML = '> ' + titles.length;
  document.getElementById('titles').appendChild(fillDiv);
  colorSelCurrent();
}

/**
 * Populates the arrays 'titles' and 'folders'
 *
 * @param parent The bookmark node from wich to get the bookmarks and folders
 */
function createBMDivs(parent) {
  folders = [];
  titles = [];
  if(parent.children !== null && parent.children !== undefined){
    parent.children.forEach(function (child) {
      if(child !== null && child !== undefined)
        if(child.url) titles.push(child);
        else folders.push(child);
    });
  }
}

/**
 * Creates all divs for a specific bookmark or folder
 *
 * @param mark The bookmark/folder node
 */
function createBMDiv(mark) {
  createIconDiv(mark);
  createTitleDiv(mark);
  createUrlDiv(mark);
  BMindex += 1;
}

/**
 * Creates a div element with specific id and class. Also adds the Listeners 'mouseoverBMDiv', 'mouseoutBMDiv' and 'pressEnter' to it.
 *
 * @param id The div's id
 * @param className The div's class
 * @returns A DOM 'div' element
 */
function createDiv(id, className){
  var div = document.createElement('div');
  div.className = className;
  div.id = id;
  div.addEventListener('mouseover', mouseoverBMDiv);
  div.addEventListener('mouseout', mouseoutBMDiv)
  div.addEventListener('click', pressEnter)
  return div
}

/**
 * Creates the icon div for a specific bookmark od folder
 *
 * @param mark The bookmark/folder node
 */
function createIconDiv(mark) {
  var link = document.createElement('a');
  var div = createDiv(ICON_ID + BMindex, BMDIV_CLASSNAME + ICON_CLASS)
  link.setAttribute('href', mark.url)
  if(mark.url) div.style.backgroundImage = 'url(' + 'chrome://favicon/' + mark.url +')';
  else div.style.backgroundImage = folderImgUrl;
  link.appendChild(div);
  document.getElementById('icons').appendChild(link);
}

/**
 * Creates the title div for a specific bookmark od folder
 *
 * @param mark The bookmark/folder node
 */
function createTitleDiv(mark) {
  var div = createDiv(TITLE_ID + BMindex, BMDIV_CLASSNAME + TITLE_CLASS);
  var link = document.createElement('a');
  link.setAttribute('href', mark.url)
  div.innerHTML = mark.title;
  div.setAttribute('markId', mark.id)
  div.setAttribute('url', mark.url)
  link.appendChild(div);
  document.getElementById('titles').appendChild(link);
}

/**
 * Creates the url div for a specific bookmark od folder
 *
 * @param mark The bookmark/folder node
 */
function createUrlDiv(mark) {
  var div = createDiv(URL_ID + BMindex, BMDIV_CLASSNAME + URL_CLASS);
  var link = document.createElement('a');
  link.setAttribute('href', mark.url)
  if(mark.url) div.innerHTML = sliceHostname(link);
  link.appendChild(div);
  document.getElementById('urls').appendChild(link);
}

/**
 * Creates the icon div for the back button
 */
function createBackIconDiv() {
  var link = document.createElement('a');
  var div = createDiv(ICON_ID + BMindex, BMDIV_CLASSNAME + ICON_CLASS + BACK_CLASS)
  link.setAttribute('href', undefined)
  div.style.backgroundImage = BackImgUrl;
  link.appendChild(div);
  document.getElementById('icons').appendChild(link);
}

/**
 * Creates the title div for the back button
 */
function createBackTitleDiv() {
  var div = createDiv(TITLE_ID + BMindex, BMDIV_CLASSNAME + TITLE_CLASS + BACK_CLASS);
  var link = document.createElement('a');
  link.setAttribute('href', undefined);
  div.setAttribute('url', undefined);
  div.innerText= backTitle;
  link.appendChild(div);
  document.getElementById('titles').appendChild(link);
}

/**
 * Creates the url div for the back button
 */
function createBackUrlDiv() {
  var div = createDiv(URL_ID + BMindex, BMDIV_CLASSNAME + URL_CLASS + BACK_CLASS);
  var link = document.createElement('a');
  link.setAttribute('href', undefined)
  link.appendChild(div);
  document.getElementById('urls').appendChild(link);
}

/**
 * Creates a seperator div. The title is displayed in the title area. The id should be unique for all current HR divs.
 *
 * @param title The displayed text
 * @param id The div's unique id
 */
function createHrDiv(title, id){
  var divICO = document.createElement('div');
  divICO.className = BMDIV_CLASSNAME + HR_CLASS;
  divICO.id = HR_ICON_ID + id;

  var divTIT = document.createElement('div');
  if(title) divTIT.innerHTML= title  ;
  divTIT.className = BMDIV_CLASSNAME + HR_CLASS;
  divTIT.id = HR_TITLE_ID + id;

  var divURL = document.createElement('div');
  divURL.className = BMDIV_CLASSNAME + HR_CLASS + HR_URL_CLASS;
  divURL.id = HR_URL_ID + id;

  document.getElementById('icons').appendChild(divICO);
  document.getElementById('titles').appendChild(divTIT);
  document.getElementById('urls').appendChild(divURL);
}

/**
 * Deletes all Elements from the divs: 'icons', 'titles' and 'urls'.
 */
function clearBody(){
  if(state == STATE_NORMAL) document.getElementById('searchBar').value = '...';
  BMindex = 0;
  currentDiv = 1;
  var divIcons = document.getElementById('icons');
  var divTitles = document.getElementById('titles');
  var divUrls = document.getElementById('urls');
  var icoChildren = divIcons.childNodes;
  var titChildren = divTitles.childNodes;
  var urlChildren = divUrls.childNodes;
  var length = icoChildren.length || 0;
  for(var i = 0; i < length; i++){
    divIcons.removeChild(icoChildren[0]);
    divTitles.removeChild(titChildren[0]);
    divUrls.removeChild(urlChildren[0]);
  }
}
