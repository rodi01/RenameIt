/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-27T17:02:27-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T19:17:06-08:00
 */
import React from 'react'
import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'
import { Rename } from '@rodi01/renameitlib'
import Input from '../Input'
import KeywordButton from '../KeywordButton'
import Preview from '../Preview'
import {
  SubmitButton,
  SecondaryButton,
  Footer,
  StyledH3,
  StyledInput,
  LabelStyles,
  inputCss,
  InputMargin,
} from '../GlobalStyles'
import { renameData } from '~/src/lib/DataHelper'
import XPosIc from '../../../images/xPosIc.svg'
import YPosIc from '../../../images/yPosIc.svg'
import LayerListIc from '../../../images/layerListIc.svg'

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

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: ${InputMargin};
  flex-direction: column;
`
const StyledLabel = styled.label`
  ${LabelStyles};
  // width: 70px;
`

const StyledSelect = styled.select`
  ${inputCss}
  flex-grow: 0;
  -webkit-appearance: none;
  background-image: url(${(props) => props.theme.select.arrow});
  background-repeat: no-repeat;
  background-position: right 6px top 50%;
  background-size: 8px auto;
  padding-right: 24px;
`

const SequenceWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  height: 32px;
  align-items: center;
`

const DDWrapper = styled.span`
  display: flex;
`

const DDText = styled.span`
  margin-left: 8px;
  line-height: 24px;
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
      selectValue: window.data.sequenceType,
    }
    this.enterFunction = this.enterFunction.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onSequenceTypeChange = this.onSequenceTypeChange.bind(this)

    this.rename = new Rename({ allowChildLayer: true })
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
      sequenceType: this.state.selectValue,
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

      // check for sequnce type
      if (this.state.selectValue === 'xPos') {
        options.currIdx = options.xIdx
      } else if (this.state.selectValue === 'yPos') {
        options.currIdx = options.yIdx
      }

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

  onSelectChange(event) {
    this.setState({ selectValue: event.target.value }, () =>
      this.previewUpdate()
    )
  }

  getSequenceName(type) {
    let name
    switch (type) {
      case 'layerList':
        name = (
          <DDWrapper>
            <LayerListIc className="dropIc" />
            <DDText>Layer order: Top to bottom</DDText>
          </DDWrapper>
        )
        break
      case 'xPos':
        name = (
          <DDWrapper>
            <XPosIc className="dropIc" />
            <DDText>Postion: Left to right, top to bottom</DDText>
          </DDWrapper>
        )
        break
      case 'yPos':
        name = (
          <DDWrapper>
            <YPosIc className="dropIc" />
            <DDText>Positon: Top to bottom, left to right</DDText>
          </DDWrapper>
        )
      default:
        break
    }

    return name
  }

  onSequenceTypeChange(type) {
    this.setState({ selectValue: type }, () => this.previewUpdate())
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
        char: '%N',
        text: 'Num. Sequence ASC',
      },
      {
        id: 'sequenceDesc',
        char: '%n',
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
        id: 'childLayer',
        char: '%ch%',
        text: 'Child Layer',
        disabled: !window.data.hasChildLayer,
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
        <InputWrapper>
          <StyledH3>Sequence</StyledH3>
          <SequenceWrapper>
            <StyledLabel htmlFor="sequence">From</StyledLabel>
            <StyledInput
              type="number"
              id="sequence"
              value={this.state.sequence}
              onChange={this.onChangeSequence.bind(this)}
              // ref={(ip) => (this.myInp = ip)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              min="0"
            />

            <Dropdown
              onSelect={this.onSequenceTypeChange}
              className="sequenceDD"
            >
              <Dropdown.Toggle id="seqTypeDD">
                {this.getSequenceName(this.state.selectValue)}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="layerList"
                  className="menuIcon layerListIc"
                >
                  {this.getSequenceName('layerList')}
                </Dropdown.Item>
                <Dropdown.Item eventKey="xPos" className="menuIcon xPosIc">
                  {this.getSequenceName('xPos')}
                </Dropdown.Item>
                <Dropdown.Item eventKey="yPos" className="menuIcon yPosIc">
                  {this.getSequenceName('yPos')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </SequenceWrapper>
        </InputWrapper>
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
