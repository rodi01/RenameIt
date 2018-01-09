/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-17T17:26:39-08:00
 * @Project: Rename It
 * @Last modified by:   rodrigo
 * @Last modified time: 2017-12-02T21:22:41-08:00
 */

/**
 * Escape Regexp
 * @param  {string} str
 * @return {string}     Escaped value
 */
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
}

/**
 * Find and Replace layer name
 * @param  {{layerName: string, findText: string, replaceWith: string, caseSensitive:boolean}} options
 * @return {string}         The renamed layer
 */
export function findReplace(options) {
  const reg = options.caseSensitive
    ? new RegExp(escapeRegExp(options.findText), "g")
    : new RegExp(escapeRegExp(options.findText), "gi")
  return options.layerName.replace(reg, options.replaceWith)
}

export function matchString(options) {
  if (options.findText.lenght <= 0) return false
  let str = options.findText
  let layerName = options.layerName
  if (!options.caseSensitive) {
    str = str.toLowerCase()
    layerName = layerName.toLowerCase()
  }

  return layerName.includes(str)
}
