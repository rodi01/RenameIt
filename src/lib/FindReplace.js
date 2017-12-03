/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-17T17:26:39-08:00
 * @Project: Rename It
 * @Last modified by:   rodrigo
 * @Last modified time: 2017-12-02T21:22:41-08:00
 */

 /**
  * Find and Replace layer name
  * @param  {{layerName: string, findText: string, replaceWith: string, caseSensitive:boolean}} options
  * @return {string}         The renamed layer
  */
 export default function findReplace(options) {
   const reg = options.caseSensitive ? new RegExp(escapeRegExp(options.findText), "g") : new RegExp(escapeRegExp(options.findText), "gi");
   const found = options.layerName.match(reg);
   return options.layerName.replace(reg, options.replaceWith);
 }


 /**
  * Escape Regexp
  * @param  {string} str
  * @return {string}     Escaped value
  */
 function escapeRegExp(str) {
     return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
 }
