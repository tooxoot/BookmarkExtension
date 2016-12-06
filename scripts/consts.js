/** @static Id of this xhrome extension*/
const extensionID =  chrome.runtime.id;
/** @static Path of the folder image */
const folderImgUrl = 'url(chrome-extension://'+ extensionID +'/resources/folder.png)';
/** @static Path of the back button image */
const BackImgUrl = 'url(chrome-extension://'+ extensionID +'/resources/back.png)';
/** @static Path if the searchbar image */
const SearchImgUrl = 'url(chrome-extension://'+ extensionID +'/resources/search.png)';
/** @static Color for unselected bookmarks/folders */
const BMDIV_BG_UNSEL = 'inherit';//'#F3F3F3'
/** @static Color for selected bookmarks/folders */
const BMDIV_BG_SEL = 'lightgray';
/** @static Classname for all bookmark divs */
const BMDIV_CLASSNAME = 'BM_DIV';
/** @static Classname form Icon divs*/
const ICON_CLASS = " ICON";
/** @static Classname for title divs*/
const TITLE_CLASS = " TITLE";
/** @static Classname for url divs*/
const URL_CLASS = " URL";
/** @static Classname for the Back div*/
const BACK_CLASS = " BACK";
/** @static Classname for HR divs*/
const HR_CLASS = ' HR';
/** @static Classname for HR-url divs*/
const HR_URL_CLASS = ' HR_URL';
/** @static Id prefix for Icon divs */
const ICON_ID = 'ICON_';
/** @static Id prefix for title divs*/
const TITLE_ID = 'TITLE_';
/** @static Id prefix for url divs*/
const URL_ID = 'URL_';
/** @static Id prefix for HR-icon divs*/
const HR_ICON_ID = 'HR_ICON_ID';
/** @static Id prefix for HR-title divs*/
const HR_TITLE_ID = 'HR_TITLE_ID';
/** @static Id prefix for HR-url divs*/
const HR_URL_ID = 'HR_URL_ID';
/** @static Placeholder to avoid ovelapping with searchbar*/
const fillDiv = document.createElement('div');
/** @static State id for the normal bookmark view*/
const STATE_NORMAL = 'normal';
/** @static State id for the search view*/
const STATE_SEARCH = 'search';

/** @static Used to count the bookmark divs*/
var BMindex = 0;
/** @static Stores the selected div's id*/
var currentDiv = null;
/** @static Stores the current parent node's id*/
var currentPath = 1;
/** @static Stores all folder nodes to view*/
var folders = [];
/** @static Stores all bookmark nodes to view*/
var titles = [];
/** @static Stores all matched url nodes to view*/
var urls = [];
/** @static True if the searchbar is focused*/
var searchFocus = false;
/** @static stores the complete node tree as an array*/
var nodeArray = [];
/** @static defines the Text displayed on the back button*/
var backTitle = 'BACK';
/** @static Stores the current system state. Either STATE_NORMAL or STATE_SEARCH*/
var state = STATE_NORMAL;