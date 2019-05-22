/*
 * @Author: Rodrigo Soares
 * @Date: 2018-01-03 17:48:48
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2019-05-22 09:00:55
 */

/**
 * Check if is artboard
 * @param  {Object}  layer The layers
 * @return {Boolean}
 */
function isArtboard(layer) {
  return layer instanceof MSArtboardGroup || layer instanceof MSSymbolMaster
}

/**
 * Check if has symbol instance
 *
 * @param {Object} layer
 * @returns {Boolean}
 */
function hasSymbolInstance(layer) {
  try {
    return (
      layer instanceof MSSymbolInstance && layer.symbolMaster() !== undefined
    )
  } catch (error) {
    return false
  }
}

/**
 * Get the name of the symbol instance
 *
 * @param {Object} layer
 * @returns {String} Name of the symbol
 */
function getSymbolName(layer) {
  let name = ""
  if (hasSymbolInstance(layer)) {
    try {
      name = String(layer.symbolMaster().name())
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }
  return name
}

function layerObject(layer, idx) {
  const parentName =
    layer.parentGroup() == null ? "" : layer.parentGroup().name()
  return {
    layer,
    name: String(layer.name()),
    frame: layer.frame(),
    idx,
    width: Math.floor(layer.frame().width()),
    height: Math.floor(layer.frame().height()),
    parentName: String(parentName),
    symbolName: getSymbolName(layer)
  }
}

/**
 * Parse common data
 * @param  {Object} context Sketch context
 * @return {Object}         Parsed Data
 */
export function parseData(context, onlyArtboards = false) {
  let contextData = context.selection
  if (onlyArtboards) {
    const aBoards = []
    contextData.forEach(el => {
      while (el && !isArtboard(el)) {
        el = el.parentGroup()
      }
      if (el) aBoards.push(el)
    })
    contextData = Array.from(new Set(aBoards))
  }

  const data = {
    doc: context.document,
    pageName: String(context.document.currentPage().name()),
    selectionCount: Array.isArray(contextData)
      ? contextData.length
      : contextData.count(),
    selection: []
  }

  let hasSymbol = false
  contextData.forEach((layer, i) => {
    data.selection[i] = layerObject(layer, i)

    if (!hasSymbol) hasSymbol = hasSymbolInstance(layer)
  })

  data.hasSymbol = hasSymbol

  return data
}

export function findReplaceDataParser(context) {
  const data = parseData(context)
  const layers = data.doc.currentPage().children()
  data.allLayers = []

  layers.forEach((layer, i) => {
    data.allLayers[i] = layerObject(layer, i)
  })

  return data
}

/**
 * Rename data
 *
 * @export
 * @param {Object} item
 * @param {Number} selectionCount
 * @param {String} inputName
 * @param {Number} startFrom
 * @param {String} pageName
 * @returns Structured object data
 */
export function renameData(
  item,
  selectionCount,
  inputName,
  startsFrom,
  pageName
) {
  return {
    layerName: item.name,
    currIdx: item.idx,
    width: item.width,
    height: item.height,
    selectionCount,
    inputName,
    startsFrom: Number(startsFrom),
    pageName,
    parentName: item.parentName,
    symbolName: item.symbolName
  }
}

/**
 * Find and replace data
 *
 * @export
 * @param {Object} item
 * @param {String} findText
 * @param {String} replaceWith
 * @param {Boolean} caseSensitive
 * @returns
 */
export function findReplaceData(item, findText, replaceWith, caseSensitive) {
  return {
    layerName: item.name,
    currIdx: item.idx,
    findText,
    replaceWith,
    caseSensitive
  }
}
