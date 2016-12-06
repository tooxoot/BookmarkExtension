//This is executed if the popup is opened
document.addEventListener('DOMContentLoaded', function() {
  var searchdiv = document.getElementById('search');
  searchdiv.style.backgroundImage = SearchImgUrl;

  fillDiv.className = BMDIV_CLASSNAME + TITLE_CLASS;
  
  document.addEventListener('keydown', keydownHandler)
  document.getElementById('searchBar').addEventListener('focusin', searchbarFIN)
  document.getElementById('searchBar').addEventListener('focusout', searchbarFOUT)
  document.getElementById('searchBar').addEventListener('input', searchbarInput)
  
  chrome.bookmarks.getTree(function(res) {
    buildNodeArray(res[0]);
    fillBody(currentPath);
  });
});




