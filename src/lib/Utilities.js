/*
 * @Author: Rodrigo Soares
 * @Date: 2018-01-03 17:48:48
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2019-05-21 13:35:38
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
function isSymbolInstance(layer) {
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
  if (isSymbolInstance(layer)) {
    name = String(layer.symbolMaster().name())
  }
  return name
}

/**
 * Check if layer styles is applied
 *
 * @param {Object} layer
 * @returns {Boolean}
 */
function hasLayerStyle(layer) {
  try {
    return layer.sharedStyle() instanceof MSSharedStyle
  } catch (error) {
    return false
  }
}

function getLayerStyle(layer) {
  let name = ""

  if (hasLayerStyle(layer)) {
    name = String(layer.sharedStyle().name())
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
    symbolName: getSymbolName(layer),
    layerStyle: getLayerStyle(layer)
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
  let lStyle = false
  contextData.forEach((layer, i) => {
    data.selection[i] = layerObject(layer, i)

    if (!hasSymbol) hasSymbol = isSymbolInstance(layer)
    if (!lStyle) lStyle = hasLayerStyle(layer)
  })

  data.hasSymbol = hasSymbol
  data.hasLayerStyle = lStyle

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
