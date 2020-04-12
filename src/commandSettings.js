/*
 * @Author: Rodrigo Soares
 * @Date: 2017-12-25 14:32:21
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2019-10-26 15:44:43
 */

import theUI from './lib/TheUI'
import { isCompatible, showAlert } from './lib/VersionAlert'

export default function (context) {
  // Check compatibility
  if (!isCompatible()) {
    showAlert()
    return
  }

  const options = {
    identifier: 'settings.ui',
    title: 'Settings',
    redirectTo: '/settings',
    width: 300,
    height: 260,
  }

  // Show UI
  theUI(context, null, options)
}
