/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-27T16:54:48-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T15:29:02-08:00
 */
import React from 'react';
import mixpanel from 'mixpanel-browser'
import { mixpanelId } from '../../src/lib/Constants'
import ReactDOM from 'react-dom'
import { HashRouter, Redirect } from 'react-router-dom';
import Routes from './routes'
import { testData, mockData } from '../../src/lib/Constants';
import pluginCall from 'sketch-module-web-view/client'

// Init Mixpanel
mixpanel.init(mixpanelId);

// Get data
if (testData && window.data == undefined) {
  window.data = mockData
} else {
  pluginCall('getData')
  pluginCall('getLocation')
}

if (process.env.NODE_ENV === 'production') {
  document.addEventListener('contextmenu', e => e.preventDefault())
}

let App

if (window.redirectTo != undefined) {
  App = () => (
    <div>
      <Routes />
      <Redirect to={window.redirectTo} />
    </div>
    )
} else {
  App = () => <Routes />
}

// Track Page
mixpanel.track('page viewed', { 'url' : window.redirectTo })


ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)
