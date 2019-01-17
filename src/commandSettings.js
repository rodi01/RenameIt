/*
 * @Author: Rodrigo Soares 
 * @Date: 2017-12-25 14:32:21 
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2018-11-21 11:37:29
 */

import theUI from "./lib/TheUI"
import { isCompatible, showAlert } from "./lib/VersionAlert"

export default function(context) {
  // Check compatibility
  if (!isCompatible()) {
    showAlert()
    return
  }

  const options = {
    identifier: "settings.ui",
    title: "Settings",
    redirectTo: "/settings",
    width: 250,
    height: 260
  }

  // Show UI
  theUI(context, null, options)
}
