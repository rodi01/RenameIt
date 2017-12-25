/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-12-19T22:27:08-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-19T22:28:58-08:00
 */

import prefsManager from 'sketch-module-user-preferences'

const pluginId = 'rename-it'
const MAX_HISTORY = 5
const defaultPreferences = {
  renameHistory: [],
  findHistory: [],
  replaceHistory: [],
}
const preferences = prefsManager.getUserPreferences(
  pluginId,
  defaultPreferences
)

export function getHistory() {
  return {
    renameHistory: sanitizeArray(preferences.renameHistory),
    findHistory: sanitizeArray(preferences.findHistory),
    replaceHistory: sanitizeArray(preferences.replaceHistory),
  }
}

export function addRenameHistory(str) {
  prefsManager.setUserPreferences(pluginId, {
    renameHistory: createArr(str, preferences.renameHistory),
  })
}

export function addFindHistory(str) {
  prefsManager.setUserPreferences(pluginId, {
    findHistory: createArr(str, preferences.findHistory),
  })
}

export function addReplaceHistory(str) {
  prefsManager.setUserPreferences(pluginId, {
    replaceHistory: createArr(str, preferences.replaceHistory),
  })
}

export function clearHistory() {
  prefsManager.setUserPreferences(pluginId, {
    renameHistory: [],
    findHistory: [],
    replaceHistory: [],
  })
}

function createArr(arr, str) {
  const pos = arr.indexOf(str)
  if (pos != -1) arr.splice(pos, 1)
  arr.unshift(str)
  return arr.slice(MAX_HISTORY)
}

function sanitizeArray(arr) {
  let a = []
  arr.forEach(function(item) {
    a.push(`${item}`)
  })
  return a
}
