/* eslint-disable global-require */
import React from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
// import mixpanel from "mixpanel-browser"
// import ReactGA from "react-ga"
import Routes from "./routes"
import { testData, mockData, mockHistory, mixpanelId } from "../../src/lib/Constants"
// import { track } from "sketch-module-google-analytics"
// import { ua } from "../../src/lib/Analytics" Init Mixpanel
// mixpanel.init(mixpanelId)
// ReactGA.initialize("UA-104184459-2", { debug: process.env.NODE_ENV === "production" })
// ReactGA.ga("set", "checkProtocolTask", function() {})

// const track = require("sketch-module-google-analytics");

// Get data
if (testData && window.data === undefined) {
  window.data = mockData
  window.dataHistory = mockHistory
} else if (window.data === undefined) {
  console.log("doesn't have data!");
  
  window.postMessage('getData')
}

if (process.env.NODE_ENV === "production") {
  document.addEventListener("contextmenu", (e) => e.preventDefault())
}

let App

if (window.redirectTo !== undefined) {
  window.location.hash = window.redirectTo
  App = () => <Routes />
} else {
  App = () => <Routes />
}

// Mixpanel super properties
if (window.superProps !== undefined) {
  // mixpanel.register(window.superProps)
  
  // ReactGA.ga("set", "dimension1", window.superProps.Platform)
  // ReactGA.ga("set", "dimension2", window.superProps.pluginVersion)
}

// Track Page
// mixpanel.track("page viewed", { url: window.redirectTo })


// ReactGA.pageview(window.redirectTo)

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
)
