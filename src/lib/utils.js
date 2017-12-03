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
export function parseData(context) {
  const selection = context.selection;
  let data = {
    doc: context.document,
    pageName: `${context.document.currentPage().name()}`,
    selectionCount: selection.count(),
    selection: []
  }
  selection.forEach((layer, i) => {
    data.selection[i] = {
      name: `${layer.name()}`,
      frame: layer.frame(),
      idx: i,
      width: layer.frame().width(),
      height: layer.frame().height()
    }
  });
  return data;
}

/**
 * Check if is artboard
 * @param  {Object}  layer The layers
 * @return {Boolean}
 */
export function isArtboard(layer) {
  return layer instanceof MSArtboardGroup || layer instanceof MSSymbolMaster;
}

/**
 * Check if selextion exists
 * @param  {Object}  context The sketch Object
 * @return {Boolean}
 */
export function hasSelection(context) {
  return context.selection.count() > 0;
}
