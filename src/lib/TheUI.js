/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-17T20:46:17-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T21:22:22-08:00
 */
import BrowserWindow from "sketch-module-web-view"
import { Rename, FindReplace } from "renameitlib"
import { exclamations } from "./Constants"
import {
  addRenameHistory,
  addFindHistory,
  addReplaceHistory,
  getHistory,
  clearHistory
} from "./History"
import getTheme from "../../resources/views/theme/index"
import { renameData, findReplaceData } from "./utils"

function showUpdatedMessage(count, data) {
  const layerStr = count === 1 ? "Layer" : "Layers"
  data.doc.showMessage(
    `${
      exclamations[Math.floor(Math.random() * exclamations.length)]
    } ${count} ${layerStr} renamed.`
  )
}

const theUI = (context, data, options) => {
  const themeColor =
    typeof MSTheme !== "undefined" && MSTheme.sharedTheme().isDark()
      ? "dark"
      : "light"
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
    return {
      Platform: "Sketch",
      pluginVersion: String(manifest.version)
    }
  }

  const getData = () => {
    const history = getHistory()
    const whereTo = options.redirectTo
    const superProps = getSuperProperties()
    contents.executeJavaScript(`
          window.theme=${JSON.stringify(theme)};
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
    const rename = new Rename({ allowLayerStyle: false, allowTextStyle: false })
    const inputData = JSON.parse(o)
    data.selection.forEach(item => {
      const opts = renameData(
        item,
        data.selectionCount,
        inputData.str,
        inputData.startsFrom,
        data.pageName
      )
      const layer = data.selection[opts.currIdx].layer
      layer.name = rename.layer(opts)
    })
    addRenameHistory(inputData.str)
    win.close()
    showUpdatedMessage(data.selectionCount, data)
  })

  contents.on("onClickFindReplace", o => {
    const findReplace = new FindReplace()
    const inputData = JSON.parse(o)
    const selData =
      inputData.searchScope === "page" ? data.allLayers : data.selection
    let totalRenamed = 0
    selData.forEach(item => {
      const opts = findReplaceData(
        item,
        inputData.findText,
        inputData.replaceText,
        Boolean(inputData.caseSensitive)
      )

      if (findReplace.match(opts)) {
        const layer = selData[opts.currIdx].layer
        layer.name = findReplace.layer(opts)
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

  contents.on("externalLinkClicked", url => {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url))
  })
}

export default theUI
