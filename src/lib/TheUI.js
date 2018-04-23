/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-17T20:46:17-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T21:22:22-08:00
 */
import BrowserWindow from "sketch-module-web-view"
import rename from "./Rename"
import { findReplace, matchString } from "./FindReplace"
import {
  addRenameHistory,
  addFindHistory,
  addReplaceHistory,
  getHistory,
  clearHistory,
} from "./History"
import { exclamations } from "./Constants"

function showUpdatedMessage(count, data) {
  const layerStr = count === 1 ? "Layer" : "Layers"
  data.doc.showMessage(
    `${exclamations[Math.floor(Math.random() * exclamations.length)]} ${count} ${layerStr} renamed.`
  )
}

export default function theUI(context, data, options) {
  const winOpts = {
    identifier: options.indentifier,
    title: options.title,
    width: options.width,
    height: options.height,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    backgroundColor: "#f7f7f7",
  }

  const browserWindow = new BrowserWindow(winOpts, "ultra-dark")
  const contents = browserWindow.webContents

  browserWindow.loadURL(require("../../resources/webview.html"))

  contents.on("getLocation", () => {
    const whereTo = options.redirectTo
    contents.executeJavaScript(`window.redirectTo="${whereTo}"`)
  })

  contents.on("getData", () => {
    const history = getHistory()
    contents.executeJavaScript(
      `window.data=${JSON.stringify(data)}; window.dataHistory=${JSON.stringify(history)};`
    )
  })

  contents.on("close", () => {
    browserWindow.close()
  })

  contents.on("onClickRename", (o) => {
    const inputData = JSON.parse(o)
    data.selection.forEach((item) => {
      const opts = {
        layerName: item.name,
        currIdx: item.idx,
        width: item.width,
        height: item.height,
        selectionCount: data.selectionCount,
        inputName: inputData.str,
        startsFrom: Number(inputData.startsFrom),
        pageName: data.pageName,
        parentName: item.parentName,
      }
      const layer = data.selection[opts.currIdx].layer
      layer.name = rename(opts)
    })
    addRenameHistory(inputData.str)
    browserWindow.close()
    showUpdatedMessage(data.selectionCount, data)
  })

  contents.on("onClickFindReplace", (o) => {
    const inputData = JSON.parse(o)
    const selData = inputData.searchScope === "page" ? data.allLayers : data.selection
    let totalRenamed = 0
    selData.forEach((item) => {
      const opts = {
        layerName: item.name,
        currIdx: item.idx,
        findText: inputData.findText,
        replaceWith: inputData.replaceText,
        caseSensitive: Boolean(inputData.caseSensitive),
      }
      if (matchString(opts)) {
        const layer = selData[opts.currIdx].layer
        layer.name = findReplace(opts)
        totalRenamed += 1
      }
    })
    addFindHistory(inputData.findText)
    addReplaceHistory(inputData.replaceText)
    browserWindow.close()
    showUpdatedMessage(totalRenamed, data)
  })

  contents.on("onClearHistory", () => {
    clearHistory()
    browserWindow.close()
  })

  // Title bar matches background
  browserWindow.panel.titlebarAppearsTransparent = true
  browserWindow.panel.titleVisibility = false
}
