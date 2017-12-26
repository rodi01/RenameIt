/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-27T17:02:27-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T21:18:07-08:00
 */
import React from "react"
import mixpanel from "mixpanel-browser"
import pluginCall from "sketch-module-web-view/client"
import { mixpanelId } from "../../../../src/lib/Constants"
import Input from "../Input"
import findReplace from "../../../../src/lib/FindReplace"
import Preview from "../Preview"

class FindReplaceLayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      findValue: "",
      replaceValue: "",
      findClear: "",
      replaceClear: "",
      caseSensitive: false,
      findFocus: false,
      replaceFocus: false,
      previewData: [],
    }
    this.enterFunction = this.enterFunction.bind(this)

    // Tracking
    mixpanel.init(mixpanelId)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.enterFunction, false)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.enterFunction, false)
  }

  onChange(event) {
    const isFind = event.target.id === "find"
    this.setState(
      {
        findValue: isFind ? event.target.value : this.state.findValue,
        replaceValue: !isFind ? event.target.value : this.state.replaceValue,
        findFocus: false,
        replaceFocus: false,
      },
      () => this.previewUpdate()
    )

    if (this.state.findValue.length > 0) this.setState({ findClear: "show" })

    if (this.state.replaceValue.length > 0) this.setState({ replaceClear: "show" })
  }

  onCaseSensitiveChange(event) {
    this.setState({ caseSensitive: event.target.checked }, () => this.previewUpdate())
  }

  onCancel() {
    pluginCall("close")
  }

  onSubmit() {
    const d = {
      findText: this.state.findValue,
      replaceText: this.state.replaceValue,
      caseSensitive: this.state.caseSensitive,
    }

    // Track input
    mixpanel.track("input", {
      find: `${this.state.findValue}`,
      replace: `${this.state.replaceValue}`,
    })

    pluginCall("onClickFindReplace", JSON.stringify(d))
  }

  enterFunction(event) {
    // Check if enter key was pressed

    if (event.keyCode === 13) {
      this.onSubmit()
    }
  }

  clearInput(event) {
    const whichInput = event.target.previousSibling.id === "find" ? "find" : "replace"
    if (event.target.previousSibling.id === "find") {
      this.setState(
        {
          findValue: "",
          findClear: "",
          replaceFocus: false,
          findFocus: true,
        },
        () => this.previewUpdate()
      )
    } else {
      this.setState(
        {
          replaceValue: "",
          replaceClear: "",
          findFocus: false,
          replaceFocus: true,
        },
        () => this.previewUpdate()
      )
    }

    // Track clear event
    mixpanel.track("clear", { input: `${whichInput}` })
  }

  previewUpdate() {
    const renamed = []
    window.data.selection.forEach((item) => {
      const options = {
        layerName: item.name,
        caseSensitive: this.state.caseSensitive,
        findText: this.state.findValue,
        replaceWith: this.state.replaceValue,
      }
      renamed.push(findReplace(options))
    })
    this.setState({ previewData: renamed })
  }

  handleFindHistory(str) {
    this.setState(
      {
        findValue: str,
        findFocus: true,
      },
      () => this.previewUpdate()
    )
  }

  handleReplaceHistory(str) {
    this.setState(
      {
        replaceValue: str,
        replaceFocus: true,
      },
      () => this.previewUpdate()
    )
  }

  render() {
    const findInputAttr = {
      id: "find",
      type: "text",
      forName: "Find:",
      wrapperClass: "inputName",
      autoFocus: true,
      value: this.state.findValue,
      onChange: this.onChange.bind(this),
      showClear: this.state.findClear,
      onClear: this.clearInput.bind(this),
      inputFocus: this.state.findFocus,
      dataHistory: window.dataHistory.findHistory,
      showHistory: true,
      handleHistory: this.handleFindHistory.bind(this),
    }

    const replaceInputAttr = {
      id: "replace",
      type: "text",
      forName: "Replace:",
      wrapperClass: "inputName",
      autoFocus: false,
      value: this.state.replaceValue,
      onChange: this.onChange.bind(this),
      showClear: this.state.replaceClear,
      onClear: this.clearInput.bind(this),
      inputFocus: this.state.replaceFocus,
      dataHistory: window.dataHistory.replaceHistory,
      showHistory: true,
      handleHistory: this.handleReplaceHistory.bind(this),
      dropup: true,
    }

    return (
      <div className="container findReplace">
        <span className="caseSensitiveWrapper">
          <input
            type="checkbox"
            id="caseSensitive"
            checked={this.state.caseSensitive}
            onChange={this.onCaseSensitiveChange.bind(this)}
          />
          <label htmlFor="caseSensitive">&nbsp;case sensitive</label>
        </span>
        <Input {...findInputAttr} />
        <Input {...replaceInputAttr} />
        <Preview data={this.state.previewData} />
        <div id="footer">
          <button id="cancelBtn" className="grey" onClick={this.onCancel}>
            Cancel
          </button>
          <button id="submitBtn" onClick={this.onSubmit.bind(this)}>
            Rename
          </button>
        </div>
      </div>
    )
  }
}

export default FindReplaceLayer
