/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-15T16:37:40-08:00
 * @Project: Rename It
 * @Last modified by:   rodrigo
 * @Last modified time: 2017-12-02T17:57:44-08:00
 */

import React from 'react'
import styled from 'styled-components'
import HistoryDropdown from './historyDropdown'
import { LabelStyles, InputMargin, StyledInput } from './GlobalStyles'

const StyledLabel = styled.label`
  ${LabelStyles};
  width: ${(props) => props.labelWidth || '100px'};
`

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: ${InputMargin};
`

class Input extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.inputFocus) this.myInp.focus()
  }

  render() {
    let historyDropdown = null
    if (this.props.showHistory !== undefined) {
      historyDropdown = (
        <HistoryDropdown
          menuData={this.props.dataHistory}
          dropdownId={`${this.props.id}-dd`}
          handleHistory={this.props.handleHistory}
          dropup={this.props.dropup}
        />
      )
    }

    return (
      <InputWrapper className={`inputWrapper ${this.props.wrapperClass}`}>
        <StyledLabel htmlFor={this.props.id} labelWidth={this.props.labelWidth}>
          {this.props.forName}
        </StyledLabel>
        <StyledInput
          type={this.props.type}
          id={this.props.id}
          value={this.props.value}
          onChange={this.props.onChange}
          autoFocus={this.props.autoFocus}
          ref={(ip) => (this.myInp = ip)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          min="0"
        />
        {historyDropdown}
      </InputWrapper>
    )
  }
}

Input.defaultProps = {
  dropup: false,
}

export default Input
