/*
 * @Author: Rodrigo Soares
 * @Date: 2020-04-24 10:42:03
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2020-04-24 11:25:10
 */

/**
 * Get Origin of layers and retunr the minX and minY
 *
 * @param {*} layers
 * @returns
 */
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

/**
 *  Find the X or Y positions of the layers and add them as object properties
 *
 * @export
 * @param {Object} layers
 * @returns {Object} Layers
 */
export function sortByX(layers) {
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

export function sortByY(layers) {
  const origin = getOrigin(layers)
  let rowStarterLayers = []

  layers.forEach((ab) => {
    let leftMostInRow = true
    layers.forEach((ab2) => {
      if (ab === ab2) return

      if (ab2.y < ab.y) {
        if (ab.x <= ab2.maxX && ab2.x <= ab.maxX) {
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
  rowStarterLayers.sort((a, b) => a.x - b.x)

  // start a list of layers for each row
  let rows = rowStarterLayers.map((ab) => [ab])
  let rowHeights = rowStarterLayers.map((ab) => ab.maxX - ab.x)
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
          (abStarter.x + abStarter.maxX) / 2 - (ab.x + ab.maxX) / 2
        )
      })

      const curStarterAb = rowStarterLayers.reduce((prev, current) =>
        prev._tmpDistance < current._tmpDistance ? prev : current
      )
      rows[curStarterAb.row].push(ab)

      // update row height
      rowHeights[curStarterAb.row] = Math.max(
        rowHeights[curStarterAb.row],
        ab.maxX - ab.x
      )
    })

  // sort each row by x position
  rows.forEach((abInRow) => {
    abInRow.sort((a, b) => a.y - b.y)
  })

  // finally, arrange everything
  let x = origin.x
  let index = 0
  let arr = []

  rows.forEach((abInRows, r) => {
    let y = origin.y
    abInRows.forEach((ab, idx) => {
      ab.yIdx = index
      index++
      arr.push(ab)
      // console.log(
      //   `Name: ${ab.name} | yIdx: ${ab.yIdx} | y: ${ab.y} | x: ${ab.x}`
      // )
    })
    x += rowHeights[r]
  })

  return arr
}

export function sortBy(layers, direction) {
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
