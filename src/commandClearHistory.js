/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-12-24T15:39:53-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-24T15:40:46-08:00
 */

import {clearHistory} from './History'

export default function (context) {
  clearHistory()
  context
    .document
    .showMessage("History Cleared!")
}
