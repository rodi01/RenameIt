/*
 * @Author: Rodrigo Soares 
 * @Date: 2017-12-25 21:54:20 
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2017-12-25 21:58:08
 */
import React from "react"
import pluginCall from "sketch-module-web-view/client"
import { Panel } from "react-bootstrap"
import mixpanel from "mixpanel-browser"
import { mixpanelId } from "../../../../src/lib/Constants"

class Settings extends React.Component {
  constructor(props) {
    super(props)

    // Tracking
    mixpanel.init(mixpanelId)
  }

  onClearHistory() {
    pluginCall("onClearHistory")
  }

  render() {
    return (
      <div className="container settings">
        <Panel>
          <h5>History Settings</h5>
          <button className="grey btn-block" onClick={() => this.onClearHistory()}>
            Clear History
          </button>
        </Panel>
      </div>
    )
  }
}

export default Settings
