/*
 * @Author: Rodrigo Soares
 * @Date: 2017-12-25 19:52:04
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2018-11-15 21:27:22
 */
import React from "react"
import mixpanel from "mixpanel-browser"
import { createGlobalStyle } from "styled-components"
import { Dropdown, MenuItem } from "react-bootstrap"
import { mixpanelId } from "../../../src/lib/Constants"

const GlobalStyles = createGlobalStyle`
    .dropdown {
      position: relative;
      display: inline-block;
      align-self: center;
    }
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      display: none;
      float: left;
      min-width: 10rem;
      padding: 0.5rem 0;
      margin: 0.125rem 0 0;
      font-size: 1rem;
      color: ${props => props.theme.input.color};
      text-align: left;
      list-style: none;
      background-color: ${props => props.theme.input.background};
      background-clip: padding-box;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 0.25rem;
    }
    .dropdown-toggle::after {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 0.255em;
      vertical-align: 0.255em;
      content: "";
      border-top: 0.3em solid;
      border-right: 0.3em solid transparent;
      border-bottom: 0;
      border-left: 0.3em solid transparent;
    }

    .dropdown-menu-right {
      right: 0;
      left: auto;
    }

    .dropup .dropdown-menu {
      top: auto;
      bottom: 100%;
      margin-top: 0;
      margin-bottom: 0.125rem;
    }

    .dropup .dropdown-toggle::after {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 0.255em;
      vertical-align: 0.255em;
      content: "";
      border-top: 0;
      border-right: 0.3em solid transparent;
      border-bottom: 0.3em solid;
      border-left: 0.3em solid transparent;
    }

    .dropup .dropdown-toggle:empty::after {
      margin-left: 0;
    }

    .dropright .dropdown-menu {
      top: 0;
      right: auto;
      left: 100%;
      margin-top: 0;
      margin-left: 0.125rem;
    }

    .dropright .dropdown-toggle::after {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 0.255em;
      vertical-align: 0.255em;
      content: "";
      border-top: 0.3em solid transparent;
      border-right: 0;
      border-bottom: 0.3em solid transparent;
      border-left: 0.3em solid;
    }

    .dropright .dropdown-toggle:empty::after {
      margin-left: 0;
    }

    .dropright .dropdown-toggle::after {
      vertical-align: 0;
    }

    .dropleft .dropdown-menu {
      top: 0;
      right: 100%;
      left: auto;
      margin-top: 0;
      margin-right: 0.125rem;
    }

    .dropleft .dropdown-toggle::after {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 0.255em;
      vertical-align: 0.255em;
      content: "";
    }

    .dropleft .dropdown-toggle::after {
      display: none;
    }

    .dropleft .dropdown-toggle::before {
      display: inline-block;
      width: 0;
      height: 0;
      margin-right: 0.255em;
      vertical-align: 0.255em;
      content: "";
      border-top: 0.3em solid transparent;
      border-right: 0.3em solid;
      border-bottom: 0.3em solid transparent;
    }

    .dropleft .dropdown-toggle:empty::after {
      margin-left: 0;
    }

    .dropleft .dropdown-toggle::before {
      vertical-align: 0;
    }

    .dropdown-menu[x-placement^="top"], .dropdown-menu[x-placement^="right"], .dropdown-menu[x-placement^="bottom"], .dropdown-menu[x-placement^="left"] {
      right: auto;
      bottom: auto;
    }

    .dropdown-divider {
      height: 0;
      margin: 0.5rem 0;
      overflow: hidden;
      border-top: 1px solid #e9ecef;
    }

    .dropdown-item {
      display: block;
      width: 100%;
      padding: 0.25rem 1.5rem;
      clear: both;
      font-weight: 400;
      color: #212529;
      text-align: inherit;
      white-space: nowrap;
      background-color: transparent;
      border: 0;
    }

    .dropdown-item:hover, .dropdown-item:focus {
      color: #16181b;
      text-decoration: none;
      background-color: #f8f9fa;
    }

    .dropdown-item.active, .dropdown-item:active {
      color: #fff;
      text-decoration: none;
      background-color: #007bff;
    }

    .dropdown-item.disabled, .dropdown-item:disabled {
      color: #6c757d;
      background-color: transparent;
    }

    .dropdown-menu.show {
      display: block;
    }

    .dropdown-header {
      display: block;
      padding: 0.5rem 1.5rem;
      margin-bottom: 0;
      font-size: 0.875rem;
      color: #6c757d;
      white-space: nowrap;
    }

    .dropdown-item-text {
      display: block;
      padding: 0.25rem 1.5rem;
      color: #212529;
    }
    .dropdown.open .dropdown-menu { display: block; }
`

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
        dropup={this.props.dropup}
      >
        <GlobalStyles />
        <Dropdown.Toggle bsStyle="primary" bsSize="xsmall">
          <span className="icon_history" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropMenu">
          <MenuItem header>Recently used</MenuItem>
          {menuItems}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default HistoryDropdown
