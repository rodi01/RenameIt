/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-17T20:46:17-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T21:22:22-08:00
 */
import BrowserWindow from "sketch-module-web-view"
import rename from "./Rename"
import { findReplace, matchString } from "./FindReplace"
import { exclamations } from "./Constants"
import {
  addRenameHistory,
  addFindHistory,
  addReplaceHistory,
  getHistory,
  clearHistory
} from "./History"

function showUpdatedMessage(count, data) {
  const layerStr = count === 1 ? "Layer" : "Layers"
  data.doc.showMessage(
    `${
      exclamations[Math.floor(Math.random() * exclamations.length)]
    } ${count} ${layerStr} renamed.`
  )
}

const theUI = (context, data, options) => {
  const winOptions = {
    identifier: options.identifier,
    title: options.title,
    width: options.width,
    height: options.height,
    minimizable: false,
    maximizable: false,
    resizable: false,
    fullscreenable: false,
    show: false
  }
  let win = new BrowserWindow(winOptions)
  const contents = win.webContents

  win.once("ready-to-show", () => {
    win.show()
  })

  win.on("closed", () => {
    win = null
  })

  win.loadURL(require("../../resources/webview.html"))

  const getSuperProperties = () => {
    const manifestPath = context.plugin
      .url()
      .URLByAppendingPathComponent("Contents")
      .URLByAppendingPathComponent("Sketch")
      .URLByAppendingPathComponent("manifest.json")
      .path()
    const manifest = NSJSONSerialization.JSONObjectWithData_options_error(
      NSData.dataWithContentsOfFile(manifestPath),
      0,
      nil
    )
    return { Platform: "Sketch", pluginVersion: String(manifest.version) }
  }

  const getData = () => {
    // const theme =
    //   typeof MSTheme !== "undefined" && MSTheme.sharedTheme().isDark()
    //     ? "dark"
    //     : "light"
    const theme = "light"
    const history = getHistory()
    const whereTo = options.redirectTo
    const superProps = getSuperProperties()
    contents.executeJavaScript(`
          window.theme="${theme}";
          window.redirectTo="${whereTo}";
          window.data=${JSON.stringify(data)};
          window.dataHistory=${JSON.stringify(history)};
          window.superProps=${JSON.stringify(superProps)};`)
  }

  contents.on("did-start-loading", () => getData())

  contents.on("getData", () => getData())

  contents.on("close", () => {
    win.close()
  })

  contents.on("onClickRename", o => {
    const inputData = JSON.parse(o)
    data.selection.forEach(item => {
      const opts = {
        layerName: item.name,
        currIdx: item.idx,
        width: item.width,
        height: item.height,
        selectionCount: data.selectionCount,
        inputName: inputData.str,
        startsFrom: Number(inputData.startsFrom),
        pageName: data.pageName,
        parentName: item.parentName
      }
      const layer = data.selection[opts.currIdx].layer
      layer.name = rename(opts)
    })
    addRenameHistory(inputData.str)
    win.close()
    showUpdatedMessage(data.selectionCount, data)
  })

  contents.on("onClickFindReplace", o => {
    const inputData = JSON.parse(o)
    const selData =
      inputData.searchScope === "page" ? data.allLayers : data.selection
    let totalRenamed = 0
    selData.forEach(item => {
      const opts = {
        layerName: item.name,
        currIdx: item.idx,
        findText: inputData.findText,
        replaceWith: inputData.replaceText,
        caseSensitive: Boolean(inputData.caseSensitive)
      }
      if (matchString(opts)) {
        const layer = selData[opts.currIdx].layer
        layer.name = findReplace(opts)
        totalRenamed += 1
      }
    })
    addFindHistory(inputData.findText)
    addReplaceHistory(inputData.replaceText)
    win.close()
    showUpdatedMessage(totalRenamed, data)
  })

  contents.on("onClearHistory", () => {
    clearHistory()
    win.close()
  })
}

export default theUI
