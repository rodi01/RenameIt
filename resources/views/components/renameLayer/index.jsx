/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-27T17:02:27-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T19:17:06-08:00
 */
import React from 'react'
import styled from 'styled-components'
import { Rename } from 'renameitlib'
import Input from '../Input'
import KeywordButton from '../KeywordButton'
import Preview from '../Preview'
import {
  SubmitButton,
  SecondaryButton,
  Footer,
  StyledH3,
} from '../GlobalStyles'
import { renameData } from '~/src/lib/DataHelper'

const KeywordsWrapper = styled.div`
  margin-top: 16px;

  ul {
    margin-top: 10px;
    display: flex;
    flex-flow: wrap;
    margin-left: -6px;
    list-style: inside;
  }

  li {
    margin: 6px;
    list-style: none;
  }
`

class RenameLayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valueAttr: '',
      showClear: '',
      sequence: 1,
      inputFocus: false,
      previewData: [],
    }
    this.enterFunction = this.enterFunction.bind(this)

    this.rename = new Rename()
  }

  componentDidMount() {
    document.addEventListener('keydown', this.enterFunction, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.enterFunction, false)
  }

  onChange(event) {
    this.setState(
      {
        valueAttr: event.target.value,
      },
      () => this.previewUpdate()
    )
    if (this.state.valueAttr.length > 0) {
      this.setState({ showClear: 'show' })
    }
  }

  onChangeSequence(event) {
    this.setState(
      {
        sequence: event.target.value,
        inputFocus: false,
      },
      () => this.previewUpdate()
    )
  }

  onButtonClicked(event) {
    event.preventDefault()
    const val = `${this.state.valueAttr}${event.target.dataset.char}`
    this.setState(
      {
        valueAttr: val,
        inputFocus: true,
        showClear: 'show',
      },
      () => this.previewUpdate()
    )

    // Track button event
    window.postMessage(
      'track',
      JSON.stringify({
        hitType: 'event',
        payload: {
          ec: 'keywordButton',
          ea: `${event.target.id}`,
          el: `${event.target.dataset.char}`,
        },
      })
    )
  }

  onCancel() {
    window.postMessage('close')
  }

  onSubmit() {
    const d = {
      str: this.state.valueAttr,
      startsFrom: this.state.sequence,
    }
    // Track input event
    window.postMessage(
      'track',
      JSON.stringify({
        hitType: 'event',
        payload: {
          ec: 'input',
          ea: 'rename',
          el: String(d.str),
        },
      })
    )

    window.postMessage('onClickRename', JSON.stringify(d))
  }

  clearInput() {
    this.setState(
      {
        valueAttr: '',
        showClear: '',
        inputFocus: true,
      },
      () => this.previewUpdate()
    )

    // Track clear event
    window.postMessage(
      'track',
      JSON.stringify({
        hitType: 'event',
        payload: {
          ec: 'clear',
          ea: 'input',
          el: 'rename',
        },
      })
    )
  }

  enterFunction(event) {
    // Check if enter key was pressed
    if (event.keyCode === 13) {
      this.onSubmit()
    }
  }

  previewUpdate() {
    const renamed = []
    window.data.selection.forEach((item) => {
      const options = renameData(
        item,
        window.data.selectionCount,
        this.state.valueAttr,
        this.state.sequence,
        window.data.pageName
      )

      renamed.push(this.rename.layer(options))
    })
    this.setState({ previewData: renamed })
  }

  handleHistory(str) {
    this.setState(
      {
        valueAttr: str,
        inputFocus: true,
      },
      () => this.previewUpdate()
    )
  }

  render() {
    const labelWidth = '70px'
    const nameInputAttr = {
      id: 'name',
      type: 'text',
      forName: 'Name',
      wrapperClass: 'inputName',
      autoFocus: true,
      value: this.state.valueAttr,
      onChange: this.onChange.bind(this),
      showClear: this.state.showClear,
      onClear: this.clearInput.bind(this),
      inputFocus: this.state.inputFocus,
      dataHistory: window.dataHistory.renameHistory,
      showHistory: true,
      handleHistory: this.handleHistory.bind(this),
      labelWidth,
    }

    const sequenceInputAttr = {
      id: 'sequence',
      type: 'number',
      forName: 'Start from',
      wrapperClass: 'inputRight',
      value: this.state.sequence,
      autoFocus: false,
      onChange: this.onChangeSequence.bind(this),
      labelWidth,
    }

    const buttons = [
      {
        id: 'currentLayer',
        char: '%*',
        text: 'Layer Name',
      },
      {
        id: 'layerWidth',
        char: '%w',
        text: 'Layer Width',
      },
      {
        id: 'layerHeight',
        char: '%h',
        text: 'Layer Height',
      },
      {
        id: 'sequenceAsc',
        char: '%n',
        text: 'Num. Sequence ASC',
      },
      {
        id: 'sequenceDesc',
        char: '%N',
        text: 'Num. Sequence DESC',
      },
      {
        id: 'sequenceAlpha',
        char: '%A',
        text: 'Alphabet Sequence',
      },
      {
        id: 'pageName',
        char: '%p',
        text: 'Page Name',
      },
      {
        id: 'parentName',
        char: '%o',
        text: 'Parent Name',
      },
      {
        id: 'symbolName',
        char: '%s',
        text: 'Symbol Name',
        disabled: !window.data.hasSymbol,
      },
      {
        id: 'styleName',
        char: '%ls%',
        text: 'Style Name',
        disabled: !window.data.hasLayerStyle,
      },
    ]

    const listItems = buttons.map((d) => (
      <li key={d.id} className="keywordBtn">
        <KeywordButton {...d} click={this.onButtonClicked.bind(this)} />
      </li>
    ))

    return (
      <div className="container rename">
        <Input {...nameInputAttr} />
        <Input {...sequenceInputAttr} />

        <KeywordsWrapper>
          <StyledH3>Keywords</StyledH3>
          <ul>{listItems}</ul>
        </KeywordsWrapper>

        <Preview data={this.state.previewData} />

        <Footer>
          <SecondaryButton onClick={this.onCancel}>Cancel</SecondaryButton>
          <SubmitButton onClick={this.onSubmit.bind(this)}>Rename</SubmitButton>
        </Footer>
      </div>
    )
  }
}

export default RenameLayer
