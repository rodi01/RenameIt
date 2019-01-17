/*
 * @Author: Rodrigo Soares
 * @Date: 2017-12-25 19:52:04
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2018-11-18 12:05:46
 */
import React from "react"
import mixpanel from "mixpanel-browser"
import { Dropdown, MenuItem } from "react-bootstrap"
import { withTheme } from "styled-components"
import { mixpanelId } from "../../../../src/lib/Constants"
import GlobalStyles from "./historyStyles"
import IconLight from "./history_ic_light.svg"
import IconDark from "./history_ic_dark.svg"

class HistoryDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.onTargetSelect = this.onTargetSelect.bind(this)

    // Tracking
    mixpanel.init(mixpanelId)
  }

  onTargetSelect(target) {
    this.props.handleHistory(target)
  }

  onToggle() {
    mixpanel.track("history", {
      dropdown: `${this.props.dropdownId}`
    })
  }

  render() {
    const Icon = this.props.theme.name === "dark" ? IconDark : IconLight
    let menuItems
    if (this.props.menuData.length > 0) {
      menuItems = this.props.menuData.map((d, idx) => (
        <MenuItem
          key={`menu-${idx}`}
          eventKey={`${d}`}
          onSelect={() => this.onTargetSelect(d)}
        >
          {d}
        </MenuItem>
      ))
    } else {
      menuItems = (
        <MenuItem key="disabled-menu" disabled>
          Empty History
        </MenuItem>
      )
    }
    return (
      <Dropdown
        id={this.props.dropdownId}
        pullRight
        onToggle={() => this.onToggle(this)}
      >
        <GlobalStyles />
        <Dropdown.Toggle bsStyle="primary" bsSize="xsmall">
          <Icon />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropMenu">
          <MenuItem header>Recently used</MenuItem>
          {menuItems}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default withTheme(HistoryDropdown)
