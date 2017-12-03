/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-27T18:26:16-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T19:46:00-08:00
 */
import { parseData } from './lib/utils'
import theUI from './lib/TheUI'

export default function(context) {
 const data = parseData(context, true)

 // Return if there is no selection and show message
 if (data.selectionCount <= 0) {
   context.document.showMessage("Rename it: You need to select at least one artboard or layer in an artboard");
   return;
 }

 const options = {
   identifier: "renameLayers.ui",
   title: "Rename Selected Artboards",
   redirectTo: "/rename",
   width: 480,
   height: 430
 }
 // Load UI
 theUI(context, data, options)
}
