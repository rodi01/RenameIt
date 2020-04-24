/*
 * @Author: Rodrigo Soares
 * @Date: 2018-01-03 17:48:48
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2019-06-04 14:43:26
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
  let name = ''
  if (isSymbolInstance(layer)) {
    try {
      name = String(layer.symbolMaster().name())
      // eslint-disable-next-line no-empty
    } catch (error) {}
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
  let name = ''

  if (hasLayerStyle(layer)) {
    try {
      name = String(layer.sharedStyle().name())
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  return name
}

/**
 * Check if has child layer
 *
 * @param {Object} layer
 * @returns {Boolean}
 */
function hasChildLayer(layer) {
  try {
    return layer.layers() !== undefined && layer.layers().length > 0
  } catch (error) {
    return false
  }
}

/**
 * Find first layer and return it
 *
 * @param {Object} layer
 * @returns {String}
 */
function getChildLayer(layer) {
  let name = ''

  if (hasChildLayer(layer)) {
    try {
      const idx = layer.layers().length - 1
      name = String(layer.layers()[idx].name())

      // eslint-disable-next-line no-empty
    } catch (error) {
      console.log('ERROR CHILD LAYER')
    }
  }

  return name
}

function getOrigin(layers) {
  const minX = layers.reduce(
    (prev, current) => (prev.x < current.x ? prev : current),
    1
  )

  const minY = layers.reduce(
    (prev, current) => (prev.y < current.y ? prev : current),
    1
  )
  return {
    x: minX.x,
    y: minY.y,
  }
}

function sortByX(layers) {
  const origin = getOrigin(layers)
  let rowStarterLayers = []

  layers.forEach((ab) => {
    let leftMostInRow = true
    layers.forEach((ab2) => {
      if (ab === ab2) return

      if (ab2.x < ab.x) {
        if (ab.y <= ab2.maxY && ab2.y <= ab.maxY) {
          leftMostInRow = false
          return
        }
      }
    })

    if (leftMostInRow) {
      rowStarterLayers.push(ab)
    }
  })

  // Sort starting layers
  rowStarterLayers.sort((a, b) => a.y - b.y)

  // start a list of layers for each row
  let rows = rowStarterLayers.map((ab) => [ab])
  let rowHeights = rowStarterLayers.map((ab) => ab.maxY - ab.y)
  rowStarterLayers.forEach((ab, i) => {
    ab.row = i
  })

  // assign all other artboards to a row by
  // computing shortest distance between artboard vertical centers
  layers
    .filter((ab) => !rowStarterLayers.includes(ab))
    .forEach((ab) => {
      rowStarterLayers.forEach((abStarter) => {
        abStarter._tmpDistance = Math.abs(
          (abStarter.y + abStarter.maxY) / 2 - (ab.y + ab.maxY) / 2
        )
      })

      const curStarterAb = rowStarterLayers.reduce((prev, current) =>
        prev._tmpDistance < current._tmpDistance ? prev : current
      )
      rows[curStarterAb.row].push(ab)

      // update row height
      rowHeights[curStarterAb.row] = Math.max(
        rowHeights[curStarterAb.row],
        ab.maxY - ab.y
      )
    })

  // sort each row by x position
  rows.forEach((abInRow) => {
    abInRow.sort((a, b) => a.x - b.x)
  })

  // finally, arrange everything
  let y = origin.y
  let index = 0
  let arr = []

  rows.forEach((abInRows, r) => {
    let x = origin.x
    abInRows.forEach((ab, idx) => {
      ab.xIdx = index
      index++
      arr.push(ab)
    })
    y += rowHeights[r]
  })
  return arr
}

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

  // Sort by X
  data.selection = sortByX(data.selection)

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
