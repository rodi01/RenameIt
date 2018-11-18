/*
 * @Author: Rodrigo Soares
 * @Date: 2017-12-26 13:14:56
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2018-11-17 22:40:33
 */

import { parseData } from "./lib/utils"
import theUI from "./lib/TheUI"

export default function(context) {
  const data = parseData(context)

  // Return if there is no selection and show message
  if (data.selectionCount <= 0) {
    context.document.showMessage(
      "Rename it: You need to select at least one layer or artboard"
    )
    return
  }

  const options = {
    identifier: "renameLayers.ui",
    title: "Rename Selected Layers",
    redirectTo: "/rename",
    width: 392,
    height: 403
  }

  // Load UI
  theUI(context, data, options)
}
