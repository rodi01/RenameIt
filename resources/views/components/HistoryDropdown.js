import React from 'react'
import { Dropdown, MenuItem } from 'react-bootstrap'

export default class HistoryDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.onTargetSelect = this.onTargetSelect.bind(this);
    this.state = { historyString: '' };
  }

  onTargetSelect(target) {
    this.props.handleHistory(target)
  }

  render() {
    const menuItems = this.props.menuData.map((d, idx) => <MenuItem key={`${idx}`} eventKey={`${d}`} onSelect={() => this.onTargetSelect(d) }>{d}</MenuItem>)
    return (
      <Dropdown id={this.props.dropdownId} pullRight>
        <Dropdown.Toggle bsStyle="primary" bsSize="xsmall">
          <span class="icon_history"></span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropMenu">
          {menuItems}
        </Dropdown.Menu>
      </Dropdown>

    )
  }
}
