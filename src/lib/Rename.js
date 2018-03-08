/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-17T17:23:24-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T10:17:35-08:00
 */

import changeCase from "change-case"

function currentLayer(newLayerName, layerName) {
  // UpperCase
  let name = newLayerName.replace(/%\*u%/gi, changeCase.upperCase(layerName))

  // LowerCase
  name = name.replace(/%\*l%/gi, changeCase.lowerCase(layerName))

  // Title Case
  name = name.replace(/%\*t%/gi, changeCase.titleCase(layerName))

  // UpperCase First
  name = name.replace(/%\*uf%/gi, changeCase.upperCaseFirst(layerName))

  // Camel Case
  name = name.replace(/%\*c%/gi, changeCase.camelCase(layerName))

  // Layername
  name = name.replace(/%\*/g, layerName)

  return name
}

function paddy(n, p, c) {
  const padChar = typeof c !== "undefined" ? c : "0"
  const pad = new Array(1 + p).join(padChar)
  return (pad + n).slice(-pad.length)
}

/**
 * Rename layer name
 * @param  {{layerName: string, currIdx: number, width: number, height: number, startsFrom: number, pageName: string, inputName: string}} options
 * @return {string}         Renamed Layer Name
 */
export default function rename(options) {
  let newLayerName = options.inputName

  // Interator
  const nInterators = newLayerName.match(/%N+/gi)
  const aInterators = newLayerName.match(/%A/gi)

  // Number Interator
  if (nInterators != null) {
    /* eslint-disable */
    // Replace Number
    function replaceNumber(match) {
      let nnSize = match.length - 1
      const letter = match.charAt(1)
      let num =
        letter == "N"
          ? options.currIdx
          : options.selectionCount - options.currIdx - 1
      num += options.startsFrom

      // Check weather or not the number is bigger than the nnSizes (works up to 9999)
      if (num > 999 && (nnSize === 1 || nnSize === 2 || nnSize === 3))
        nnSize = 4
      else if (num > 99 && (nnSize === 1 || nnSize === 2)) nnSize = 3
      else if (num > 9 && nnSize == 1) nnSize = 2

      return paddy(num, nnSize)
    }
    /* eslint-enable */

    newLayerName = newLayerName.replace(/%n+/gi, replaceNumber)
  }

  // Alpha Interator
  if (aInterators != null) {
    const alphaStr = "abcdefghijklmnopqrstuvwxyz"
    const alphaArr = alphaStr.split("")
    const totalAlpha = alphaArr.length

    /* eslint-disable */
    // Replace Alpha
    function replaceAlpha(match) {
      const letter = match.charAt(1)
      let alpha = alphaArr[options.currIdx % totalAlpha]

      if (options.currIdx >= totalAlpha) {
        const flIdx = Math.floor(currIdx / totalAlpha)
        alpha = `${alphaArr[flIdx - 1]}${alpha}`
      }

      return letter == "A" ? alpha.toUpperCase() : alpha
    }
    /* eslint-enable */

    newLayerName = newLayerName.replace(/%a/gi, replaceAlpha)
  }

  // Replace asterisks
  newLayerName = currentLayer(newLayerName, options.layerName)

  // Replace escaped asterisks
  // newLayerName = newLayerName.replace(/\\\*/g, "*");

  // Add Width and/or height
  newLayerName = newLayerName.replace(/%w/gi, options.width)
  newLayerName = newLayerName.replace(/%h/gi, options.height)

  // Page Name
  newLayerName = newLayerName.replace(/%p/gi, options.pageName)

  // Parent Name
  newLayerName = newLayerName.replace(/%o/gi, options.parentName)

  // Color
  newLayerName = newLayerName.replace(/%c/gi, options.color)

  // Return new name
  return newLayerName
}
