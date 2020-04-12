/* eslint-disable global-require */
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import Routes from './routes'
import { testData, mockData, mockHistory } from '../../src/lib/Constants'

// Get data
if (testData && window.data === undefined) {
  window.data = mockData
  window.dataHistory = mockHistory
} else if (window.data === undefined) {
  console.log("doesn't have data!")

  window.postMessage('getData')
}

if (process.env.NODE_ENV === 'production') {
  document.addEventListener('contextmenu', (e) => e.preventDefault())
}

let App

if (window.redirectTo !== undefined) {
  window.location.hash = window.redirectTo
  App = () => <Routes />
} else {
  App = () => <Routes />
}

// Track Page
window.postMessage(
  'track',
  JSON.stringify({
    hitType: 'pageview',
    payload: {
      dp: window.redirectTo,
    },
  })
)

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)
