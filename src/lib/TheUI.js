/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-17T20:46:17-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T21:22:22-08:00
 */

import rename  from "./Rename"
import findReplace from "./FindReplace"
import WebUI from 'sketch-module-web-view'

export default function theUI(context, data, options) {
  const webUI = new WebUI(context, require(`../../resources/webview.html`), {
    identifier: options.indentifier, // to reuse the UI
    x: 0,
    y: 0,
    title: options.title,
    width: options.width,
    height: options.height,
    blurredBackground: false,
    background: hexToNSColor('f7f7f7'),
    onlyShowCloseButton: true,
    hideTitleBar: false,
    shouldKeepAround: true,
    handlers: {
      getLocation: () => {
        const whereTo = options.redirectTo
        webUI.eval(`window.redirectTo="${whereTo}"`)
      },
      getData: () => {
        webUI.eval(`window.data=${JSON.stringify(data)}`)
      },
      close: () => {
        webUI.close();
      },
      onClickRename: (o) => {
        const d = JSON.parse(o)
        data.selection.forEach((item) => {
          const opts = {
            layerName: item.name,
            currIdx: item.idx,
            width: item.width,
            height: item.height,
            selectionCount: data.selectionCount,
            inputName: d.str,
            startsFrom: Number(d.startsFrom),
            pageName: data.pageName
          };
          layer = context.selection[opts.currIdx];
          layer.name = rename(opts);
        })
        webUI.close()
      },
      onClickFindReplace: (o) => {
        const d = JSON.parse(o);
        data.selection.forEach((item) => {
          const opts = {
            layerName: item.name,
            currIdx: item.idx,
            findText: d.findText,
            replaceWith: d.replaceText,
            caseSensitive: Boolean(d.caseSensitive)
          }
          layer = context.selection[opts.currIdx];
          layer.name = findReplace(opts);
        });
        webUI.close()
      }
    }
  })
}

/**
 * Return NSColor
 * @param  {[type]} hex [description]
 * @return {[type]}     [description]
 */
function hexToNSColor(hex) {
	var r = parseInt(hex.substring(0, 2), 16) / 255,
	    g = parseInt(hex.substring(2, 4), 16) / 255,
	    b = parseInt(hex.substring(4, 6), 16) / 255,
	    a = 1;
	return NSColor.colorWithRed_green_blue_alpha(r, g, b, a);
}
