/**
 * Checks if obj is neither null or undefined
 * 
 * @param obj Any variable
 * @returns True if obj is neither null or undefined
 */
function notNU(obj){ return obj !== null && obj !== undefined }
/**
 * Checks if obj is either null or undefined
 * 
 * @param obj Any variable
 * @returns True if obj is either null or undefined
 */
function nOrU(obj){ return obj == null || obj == undefined }

/**
 * De-Colorizes the current bookmark
 */
function colorUnselCurrent() {
  if(nOrU(document.getElementById(ICON_ID + currentDiv))) return;
  document.getElementById(ICON_ID + currentDiv).style.backgroundColor = BMDIV_BG_UNSEL;
  document.getElementById(TITLE_ID + currentDiv).style.backgroundColor = BMDIV_BG_UNSEL;
  document.getElementById(URL_ID + currentDiv).style.backgroundColor = BMDIV_BG_UNSEL;
}

/**
 * Colorizes the current bookmark
 */
function colorSelCurrent() {
  if(nOrU(document.getElementById(ICON_ID + currentDiv))) return;
  document.getElementById(ICON_ID + currentDiv).style.backgroundColor = BMDIV_BG_SEL;
  document.getElementById(TITLE_ID + currentDiv).style.backgroundColor = BMDIV_BG_SEL;
  document.getElementById(URL_ID + currentDiv).style.backgroundColor = BMDIV_BG_SEL;
}

/**
 * Give a specific Url this method slices off the 'www.' from the host's name 
 * 
 * @param link The Url to be sliced as String
 * @returns Hostname without 'www.'
 */
function sliceHostname(link) {
  var host = link.hostname;
  if( host.slice(0,4) === 'www.') return host.slice(4);
  else return host
}





