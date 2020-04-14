/*
 * @Author: Rodrigo Soares
 * @Date: 2017-12-25 16:57:22
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2019-10-26 15:19:54
 */

import Settings from "sketch/settings" // eslint-disable-line

const MAX_HISTORY = 5
const RENAME_HISTORY = "renameHistory"
const FIND_HISTORY = "findHistory"
const REPLACE_HISTORY = "replaceHistory"

function sanitizeArray(arr) {
  const a = []
  arr.forEach(item => {
    a.push(String(item))
  })
  return a
}

function createArr(str, arr) {
  const pos = arr.indexOf(str)
  if (pos !== -1) arr.splice(pos, 1)
  arr.unshift(str)
  const newArr = arr.filter(entry => entry.trim() !== "")
  if (newArr.length <= MAX_HISTORY) {
    return newArr
  }

  return newArr.slice(0, MAX_HISTORY)
}

const getSettings = key => Settings.settingForKey(key) || []

export function getHistory() {
  return {
    renameHistory: getSettings(RENAME_HISTORY),
    findHistory: getSettings(FIND_HISTORY),
    replaceHistory: getSettings(REPLACE_HISTORY)
  }
}

export function addRenameHistory(str) {
  Settings.setSettingForKey(
    RENAME_HISTORY,
    createArr(str, sanitizeArray(getSettings(RENAME_HISTORY)))
  )
}

export function addFindHistory(str) {
  Settings.setSettingForKey(
    FIND_HISTORY,
    createArr(str, sanitizeArray(getSettings(FIND_HISTORY)))
  )
}

export function addReplaceHistory(str) {
  Settings.setSettingForKey(
    REPLACE_HISTORY,
    createArr(str, sanitizeArray(getSettings(REPLACE_HISTORY)))
  )
}

export function clearHistory() {
  ;[RENAME_HISTORY, FIND_HISTORY, REPLACE_HISTORY].forEach(key => {
    Settings.setSettingForKey(key, undefined)
  })
}
