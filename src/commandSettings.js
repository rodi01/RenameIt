/*
 * @Author: Rodrigo Soares 
 * @Date: 2017-12-25 14:32:21 
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2017-12-25 20:17:59
 */

import theUI from "./lib/TheUI"

export default function(context) {
  const options = {
    identifier: "settings.ui",
    title: "Settings",
    redirectTo: "/settings",
    width: 250,
    height: 250,
  }

  theUI(context, null, options)
}
