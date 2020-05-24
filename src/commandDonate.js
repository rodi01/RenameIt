/*
 * @Author: Rodrigo Soares
 * @Date: 2017-12-25 14:32:21
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2020-05-24 02:20:54
 */

export default function (context) {
  NSWorkspace.sharedWorkspace().openURL(
    NSURL.URLWithString('https://www.paypal.me/rodi01/5')
  )
}
