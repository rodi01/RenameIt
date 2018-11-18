/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-15T16:37:40-08:00
 * @Project: Rename It
 * @Last modified by:   rodrigo
 * @Last modified time: 2017-12-02T17:57:44-08:00
 */

import React from "react"
import styled from "styled-components"
import HistoryDropdown from "./HistoryDropdown"

const StyledInput = styled.input`
  background: ${props => props.theme.input.background};
  padding: 0 8px;
  border-radius: 4px;
  height: 24px;
  border: 1px solid ${props => props.theme.input.border};
  color: ${props => props.theme.input.color};
  margin-left: 8px;
  font-size: 13px;
  letter-spacing: -0.08px;
  flex-grow: 1; 
  margin-right: 8px;

  &[type=number] {
    width: 50px;
    flex-grow: 0;
    padding-right: 2px;
  }

  &:focus{
    outline: none;
    border-color: ${props => props.theme.input.borderActive};
  }
`

const StyledLabel = styled.label`
  font-size: 14px;
  letter-spacing: -0.08px;
  align-self: center;
  width: 70px;
`

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;

`

class Input extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.inputFocus) this.myInp.focus()
  }

  render() {
    // let clearBtn = null
    // let clearBtnClass = null
    let historyDropdown = null
    // if (this.props.showClear !== undefined) {
    //   clearBtn = (
    //     <span
    //       id="clearBtn"
    //       title="Clear"
    //       className={this.props.showClear}
    //       onClick={this.props.onClear}
    //     />
    //   )
    //   clearBtnClass = "inputClearWrapper"
    // }
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
        <StyledLabel htmlFor={this.props.id}>{this.props.forName}</StyledLabel>
        <StyledInput
          type={this.props.type}
          id={this.props.id}
          value={this.props.value}
          onChange={this.props.onChange}
          autoFocus={this.props.autoFocus}
          ref={ip => (this.myInp = ip)}
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
  dropup: false
}

export default Input
