/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-15T16:37:40-08:00
 * @Project: Rename It
 * @Last modified by:   rodrigo
 * @Last modified time: 2017-12-02T17:57:44-08:00
 */

import React from 'react';

export default class Input extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.inputFocus)
      this.myInp.focus()
  }

  render() {
    let clearBtn = null;
    let clearBtnClass = null;
    if (this.props.showClear != undefined) {
      clearBtn = <span id="clearBtn" title="Clear" className={this.props.showClear} onClick={this.props.onClear}></span>;
      clearBtnClass = "inputClearWrapper";
    }

    return (
      <div class={`inputWrapper ${this.props.wrapperClass}`}>
        <label for={this.props.id}>{this.props.forName}</label>
        <span class={clearBtnClass}>
          <input type={this.props.type} id={this.props.id} value={this.props.value} onChange={this.props.onChange} autoFocus={this.props.autoFocus} ref={(ip) => this.myInp = ip} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" min="0" />
          {clearBtn}
        </span>
    </div>
  );
  }
}
