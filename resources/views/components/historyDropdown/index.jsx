/*
 * @Author: Rodrigo Soares
 * @Date: 2017-12-25 19:52:04
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2019-10-13 10:09:54
 */
import React from 'react'
import { Dropdown, DropdownItem } from 'react-bootstrap'
import { withTheme } from 'styled-components'
import GlobalStyles from './historyStyles'
import IconLight from './history_ic_light.svg'
import IconDark from './history_ic_dark.svg'

class HistoryDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.onTargetSelect = this.onTargetSelect.bind(this)
  }

  onTargetSelect(target) {
    this.props.handleHistory(target)
  }

  onToggle() {
    window.postMessage(
      'track',
      JSON.stringify({
        hitType: 'event',
        payload: {
          ec: 'history',
          ea: 'dropdown',
          el: `${this.props.dropdownId}`,
        },
      })
    )
  }

  render() {
    const Icon = this.props.theme.name === 'dark' ? IconDark : IconLight
    let menuItems
    if (this.props.menuData.length > 0) {
      menuItems = this.props.menuData.map((d, idx) => (
        <Dropdown.Item
          key={`menu-${idx}`}
          eventKey={`${d}`}
          onSelect={() => this.onTargetSelect(d)}
        >
          {d}
        </Dropdown.Item>
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
          <Dropdown.Header>Recently used</Dropdown.Header>
          {menuItems}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default withTheme(HistoryDropdown)
