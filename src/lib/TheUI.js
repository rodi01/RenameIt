/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-17T20:46:17-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T21:22:22-08:00
 */
import BrowserWindow from 'sketch-module-web-view'
import track from 'sketch-module-google-analytics'
import { Rename, FindReplace } from '@rodi01/renameitlib'
import { renameData, findReplaceData } from './DataHelper'
import { exclamations } from './Constants'
import {
  addRenameHistory,
  addFindHistory,
  addReplaceHistory,
  getHistory,
  clearHistory,
} from './History'
import getTheme from '../../resources/views/theme/index'
import { setSequenceType } from './RenameHelpers'

function showUpdatedMessage(count, data) {
  const layerStr = count === 1 ? 'Layer' : 'Layers'
  data.doc.showMessage(
    `${
      exclamations[Math.floor(Math.random() * exclamations.length)]
    } ${count} ${layerStr} renamed.`
  )
}

const theUI = (context, data, options) => {
  const themeColor =
    typeof MSTheme !== 'undefined' && MSTheme.sharedTheme().isDark()
      ? 'dark'
      : 'light'
  const theme = getTheme(themeColor)

  const winOptions = {
    identifier: options.identifier,
    title: options.title,
    width: options.width,
    height: options.height,
    minimizable: false,
    maximizable: false,
    resizable: false,
    fullscreenable: false,
    backgroundColor: theme.bg,
    alwaysOnTop: true,
    show: false,
  }
  let win = new BrowserWindow(winOptions)
  const contents = win.webContents
  const history = getHistory()
  const whereTo = options.redirectTo
  contents.insertJS(
    `
    window.theme=${JSON.stringify(theme)};
    window.redirectTo="${whereTo}";
    window.data=${JSON.stringify(data)};
    window.dataHistory=${JSON.stringify(history)};
    `
  )

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('closed', () => {
    win = null
  })

  win.loadURL(require('../../resources/webview.html'))

  const getData = () => {
    const history = getHistory()
    const whereTo = options.redirectTo
    contents.executeJavaScript(`
          window.redirectTo="${whereTo}";
          window.data=${JSON.stringify(data)};
          window.dataHistory=${JSON.stringify(history)};`)
  }

  contents.on('did-start-loading', () => getData())

  contents.on('getData', () => getData())

  contents.on('close', () => {
    win.close()
  })

  contents.on('onClickRename', (o) => {
    const rename = new Rename({ allowChildLayer: true })

    const inputData = JSON.parse(o)

    data.selection.forEach((item) => {
      const opts = renameData(
        item,
        data.selectionCount,
        inputData.str,
        inputData.startsFrom,
        data.pageName
      )

      if (inputData.sequenceType === 'xPos') {
        opts.currIdx = opts.xIdx
      } else if (inputData.sequenceType === 'yPos') {
        opts.currIdx = opts.yIdx
      }
      const layer = item.layer
      layer.name = rename.layer(opts)
    })
    addRenameHistory(inputData.str)

    // Set Sequence Type
    setSequenceType(inputData.sequenceType)

    win.close()
    showUpdatedMessage(data.selectionCount, data)
  })

  contents.on('onClickFindReplace', (o) => {
    const findReplace = new FindReplace()
    const inputData = JSON.parse(o)
    const selData =
      inputData.searchScope === 'page' ? data.allLayers : data.selection
    let totalRenamed = 0
    selData.forEach((item) => {
      const opts = findReplaceData(
        item,
        inputData.findText,
        inputData.replaceText,
        Boolean(inputData.caseSensitive)
      )

      if (findReplace.match(opts)) {
        const layer = item.layer
        layer.name = findReplace.layer(opts)
        totalRenamed += 1
      }
    })
    addFindHistory(inputData.findText)
    addReplaceHistory(inputData.replaceText)
    win.close()
    showUpdatedMessage(totalRenamed, data)
  })

  contents.on('onClearHistory', () => {
    clearHistory()
    win.close()
  })

  contents.on('externalLinkClicked', (url) => {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url))
  })

  contents.on('track', (options) => {
    const parsedOptions = JSON.parse(options)
    track('UA-104184459-2', parsedOptions.hitType, parsedOptions.payload)
  })
}

export default theUI
