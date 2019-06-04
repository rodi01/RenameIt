/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-15T23:06:38-08:00
 * @Project: Rename It
 * @Last modified by:   rodrigo
 * @Last modified time: 2017-11-16T11:15:26-08:00
 */
import React from "react"
import { Button } from "./GlobalStyles"

/* eslint-disable */
export default class KeywordButton extends React.Component {
  render() {
    return (
      <Button
        id={this.props.id}
        data-char={this.props.char}
        title={`Shortcut: ${this.props.char}`}
        onClick={this.props.click}
        type="button"
        disabled={this.props.disabled}
      >
        {this.props.text}
      </Button>
    )
  }
}
