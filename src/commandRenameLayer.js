/*
 * @Author: Rodrigo Soares
 * @Date: 2017-12-26 13:14:56
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2020-05-04 02:30:00
 */

import { parseData } from '~/src/lib/Utilities'
import theUI from './lib/TheUI'
import { isCompatible, showAlert } from './lib/VersionAlert'

export default function (context) {
  // Check compatibility
  if (!isCompatible()) {
    showAlert()
    return
  }

  const data = parseData(context)

  // Return if there is no selection and show message
  if (data.selectionCount <= 0) {
    context.document.showMessage(
      'Rename it: You need to select at least one layer or artboard'
    )
    return
  }

  const options = {
    identifier: 'renameLayers.ui',
    title: 'Rename Selected Layers',
    redirectTo: '/rename',
    width: 405,
    height: 480,
  }

  // Show UI
  theUI(context, data, options)
}
