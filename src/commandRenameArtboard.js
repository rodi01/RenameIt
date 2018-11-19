/*
 * @Author: Rodrigo Soares
 * @Date: 2017-12-26 13:15:01
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2018-11-18 21:34:09
 */

import { parseData } from "./lib/utils"
import theUI from "./lib/TheUI"

export default function(context) {
  const data = parseData(context, true)

  // Return if there is no selection and show message
  if (data.selectionCount <= 0) {
    context.document.showMessage(
      "Rename it: You need to select at least one artboard or layer in an artboard"
    )
    return
  }

  const options = {
    identifier: "renameLayers.ui",
    title: "Rename Selected Artboards",
    redirectTo: "/rename",
    width: 392,
    height: 430
  }

  // Load UI
  theUI(context, data, options)
}
