/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-10-28T08:09:29-07:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T15:12:54-08:00
 */
import {hasSelection, parseData} from './lib/utils'
import theUI from './lib/TheUI'

export default function(context) {
  // Return if there is no selection and show message
  if (!hasSelection(context)) {
    context.document.showMessage("Rename it: You need to select at least one layer or artboard");
    return;
  }

  const data = parseData(context)
  const options = {
    identifier: "renameLayers.ui",
    title: "Rename Selected Layers",
    redirectTo: "/rename",
    width: 480,
    height: 430
  }
  // Load UI
  theUI(context, data, options)
}
