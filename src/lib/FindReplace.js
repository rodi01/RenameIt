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
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") // eslint-disable-line
}

function isRegex(str) {
  let isValid = true
  try {
    new RegExp(str) // eslint-disable-line
  } catch (e) {
    isValid = false
  }
  return isValid
}

/**
 * Find and Replace layer name
 * @param  {{layerName: string, findText: string, replaceWith: string, caseSensitive:boolean}} options
 * @return {string}         The renamed layer
 */
export function findReplace(options) {
  const str = String(options.findText)
  let reg = options.caseSensitive
    ? new RegExp(escapeRegExp(str), "g")
    : new RegExp(escapeRegExp(str), "gi")
  // return options.layerName.replace(reg, options.replaceWith)

  if (isRegex(str)) reg = RegExp(String(str), "g")
  console.log(reg)

  return options.layerName.replace(reg, options.replaceWith)
}

export function matchString(options) {
  if (options.findText.lenght <= 0) return false
  let str = String(options.findText)
  let layerName = options.layerName
  if (isRegex(str)) return true
  if (!options.caseSensitive) {
    str = str.toLowerCase()
    layerName = layerName.toLowerCase()
  }

  return layerName.includes(str)
}
