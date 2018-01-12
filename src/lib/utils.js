/*
 * @Author: Rodrigo Soares 
 * @Date: 2018-01-03 17:48:48 
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2018-01-05 11:53:41
 */

/**
 * Check if is artboard
 * @param  {Object}  layer The layers
 * @return {Boolean}
 */
function isArtboard(layer) {
  return layer instanceof MSArtboardGroup || layer instanceof MSSymbolMaster
}

function layerObject(layer, idx) {
  const parentName = layer.parentGroup() == null ? "" : layer.parentGroup().name()
  return {
    layer,
    name: `${layer.name()}`,
    frame: layer.frame(),
    idx,
    width: layer.frame().width(),
    height: layer.frame().height(),
    parentName: `${parentName}`,
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
    pageName: `${context.document.currentPage().name()}`,
    selectionCount: Array.isArray(contextData) ? contextData.length : contextData.count(),
    selection: [],
  }
  contextData.forEach((layer, i) => {
    data.selection[i] = layerObject(layer, i)
  })

  return data
}

export function findReplaceData(context) {
  const data = parseData(context)
  const layers = data.doc.currentPage().children()
  data.allLayers = []

  layers.forEach((layer, i) => {
    data.allLayers[i] = layerObject(layer, i)
  })

  return data
}
