/*
 * @Author: Rodrigo Soares
 * @Date: 2017-12-26 13:15:01
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2019-05-20 22:22:54
 */

import { parseData } from "~/src/lib/Utilities"
import theUI from "./lib/TheUI"
import { isCompatible, showAlert } from "./lib/VersionAlert"

export default function(context) {
  if (!isCompatible()) {
    showAlert()
    return
  }

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
    height: 420
  }

  // Load UI
  theUI(context, data, options)
}
