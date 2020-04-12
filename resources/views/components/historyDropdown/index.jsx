/*
 * @Author: Rodrigo Soares
 * @Date: 2017-12-25 19:52:04
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2019-10-13 10:09:54
 */
import React from "react"
import mixpanel from "mixpanel-browser"
import ReactGA from "react-ga"
import { Dropdown, DropdownItem } from "react-bootstrap"
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
    ReactGA.event({
      category: "history",
      action: "dropdown",
      label: `${this.props.dropdownId}`
    })
  }

  render() {
    const Icon = this.props.theme.name === "dark" ? IconDark : IconLight
    let menuItems
    if (this.props.menuData.length > 0) {
      menuItems = this.props.menuData.map((d, idx) => (
        <DropdownItem key={`menu-${idx}`} eventKey={`${d}`} onSelect={() => this.onTargetSelect(d)}>
          {d}
        </DropdownItem>
      ))
    } else {
      menuItems = (
        <DropdownItem key="disabled-menu" disabled>
          Empty History
        </DropdownItem>
      )
    }
    return (
      <Dropdown id={this.props.dropdownId} onToggle={() => this.onToggle(this)}>
        <GlobalStyles />
        <Dropdown.Toggle>
          <Icon />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropMenu">
          <DropdownItem header>Recently used</DropdownItem>
          {menuItems}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default withTheme(HistoryDropdown)
