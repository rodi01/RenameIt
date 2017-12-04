/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-11T17:53:44-08:00
 * @Project: Rename It
 * @Last modified time: 2017-11-17T21:47:17-08:00
 */

/**
 * Parse common data
 * @param  {Object} context Sketch context
 * @return {Object}         Parsed Data
 */
export function parseData(context, onlyArtboards = false) {
  let selection = context.selection;

  if (onlyArtboards) {
    let aBoards = []
    selection.forEach((el) => {
      while (el && !isArtboard(el)) {
        el = el.parentGroup();
 		  }
      if(el)
        aBoards.push(el)
    })
    selection = Array.from(new Set(aBoards))
  }

  let data = {
    doc: context.document,
    pageName: `${context.document.currentPage().name()}`,
    selectionCount: (Array.isArray(selection)) ? selection.length : selection.count(),
    selection: []
  }
  selection.forEach((layer, i) => {
    data.selection[i] = {
      layer: layer,
      name: `${layer.name()}`,
      frame: layer.frame(),
      idx: i,
      width: layer.frame().width(),
      height: layer.frame().height(),
      parentName: `${layer.parentGroup().name()}`
    }
  });

  return data;
}

/**
 * Check if is artboard
 * @param  {Object}  layer The layers
 * @return {Boolean}
 */
function isArtboard(layer) {
  return layer instanceof MSArtboardGroup || layer instanceof MSSymbolMaster;
}
