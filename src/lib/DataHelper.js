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
    symbolName: item.symbolName,
    layerStyle: item.layerStyle,
    childLayer: item.childLayer,
    x: item.x,
    y: item.y,
    xIdx: item.xIdx,
    yIdx: item.yIdx,
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
    caseSensitive,
  }
}
