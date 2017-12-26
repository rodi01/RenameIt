/*
 * @Author: Rodrigo Soares 
 * @Date: 2017-12-25 16:57:22 
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2017-12-25 21:40:31
 */

import prefsManager from "sketch-module-user-preferences"

const pluginId = "rename-it"
const MAX_HISTORY = 5
const defaultPreferences = {
  renameHistory: [],
  findHistory: [],
  replaceHistory: [],
}
const preferences = prefsManager.getUserPreferences(pluginId, defaultPreferences)

function sanitizeArray(arr) {
  const a = []
  arr.forEach((item) => {
    a.push(`${item}`)
  })
  return a
}

function createArr(str, arr) {
  const pos = arr.indexOf(str)
  if (pos !== -1) arr.splice(pos, 1)
  arr.unshift(str)
  console.log(arr.length <= MAX_HISTORY)
  if (arr.length <= MAX_HISTORY) {
    return arr
  }

  return arr.slice(0, MAX_HISTORY)
}

export function getHistory() {
  return {
    renameHistory: sanitizeArray(preferences.renameHistory),
    findHistory: sanitizeArray(preferences.findHistory),
    replaceHistory: sanitizeArray(preferences.replaceHistory),
  }
}

export function addRenameHistory(str) {
  const arr = createArr(str, sanitizeArray(preferences.renameHistory))
  prefsManager.setUserPreferences(pluginId, {
    renameHistory: arr,
  })
}

export function addFindHistory(str) {
  prefsManager.setUserPreferences(pluginId, {
    findHistory: createArr(str, sanitizeArray(preferences.findHistory)),
  })
}

export function addReplaceHistory(str) {
  prefsManager.setUserPreferences(pluginId, {
    replaceHistory: createArr(str, sanitizeArray(preferences.replaceHistory)),
  })
}

export function clearHistory() {
  prefsManager.setUserPreferences(pluginId, {
    renameHistory: [],
    findHistory: [],
    replaceHistory: [],
  })
}
