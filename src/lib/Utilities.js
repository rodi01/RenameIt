/*
 * @Author: Rodrigo Soares
 * @Date: 2018-01-03 17:48:48
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2020-04-27 00:00:47
 */

import {
  getPositionalSequence,
  isArtboard,
  isSymbolInstance,
  getSymbolName,
  hasLayerStyle,
  getLayerStyle,
  hasChildLayer,
  getChildLayer,
  getSequenceType,
} from './RenameHelpers'

/**
 * The Layer Object builder
 *
 * @param {Object} layer
 * @param {Integer} idx
 * @returns {Object}
 */
function layerObject(layer, idx) {
  const parentName =
    layer.parentGroup() == null ? '' : layer.parentGroup().name()

  const obj = {
    layer,
    name: String(layer.name()),
    frame: layer.frame(),
    idx,
    width: Math.floor(layer.frame().width()),
    height: Math.floor(layer.frame().height()),
    parentName: String(parentName),
    symbolName: getSymbolName(layer),
    layerStyle: getLayerStyle(layer),
    childLayer: getChildLayer(layer),
    x: layer.frame().x(),
    y: layer.frame().y(),
  }

  obj.maxX = obj.x + obj.width
  obj.maxY = obj.y + obj.height

  return obj
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
    contextData.forEach((el) => {
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
    selection: [],
  }

  let hasSymbol = false
  let lStyle = false
  let childLayer = false

  contextData.forEach((layer, i) => {
    data.selection[i] = layerObject(layer, i)

    if (!hasSymbol) hasSymbol = isSymbolInstance(layer)
    if (!lStyle) lStyle = hasLayerStyle(layer)
    if (!childLayer) childLayer = hasChildLayer(layer)
  })

  data.hasSymbol = hasSymbol
  data.hasLayerStyle = lStyle
  data.hasChildLayer = childLayer
  data.sequenceType = getSequenceType()

  // Positional Sequence
  data.selection = getPositionalSequence(data.selection)

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
