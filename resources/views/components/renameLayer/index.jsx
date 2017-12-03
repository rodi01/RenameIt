/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-27T17:02:27-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T19:17:06-08:00
 */
import React from 'react';
import rename from '../../../../src/lib/Rename'
import Input from '../Input'
import KeywordButton from '../KeywordButton'
import pluginCall from 'sketch-module-web-view/client'
import Preview from '../Preview'

class RenameLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueAttr: '',
      showClear: '',
      sequence: 1,
      inputFocus: false,
      previewData: []
    };
    this.enterFunction = this.enterFunction.bind(this);
  }
  enterFunction(event) {
    // Check if enter key was pressed
    if(event.keyCode === 13) {
      this.onSubmit();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.enterFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.enterFunction, false);
  }

  onChange(event) {
    this.setState({valueAttr: event.target.value}, () => this.previewUpdate())
    if (this.state.valueAttr.length > 0) {
      this.setState({showClear: 'show'});
    }
  }

  onChangeSequence(event) {
    this.setState({
      sequence: event.target.value,
      inputFocus: false
    }, () => this.previewUpdate());
  }

  clearInput() {
    this.setState({
      valueAttr: '',
      showClear: '',
      inputFocus: true
    }, () => this.previewUpdate());
  }

  onButtonClicked(event) {
    event.preventDefault();
    const val = `${this.state.valueAttr}${event.target.dataset.char}`
    this.setState({
      valueAttr: val,
      inputFocus: true,
      showClear: 'show'
    }, () => this.previewUpdate());

  }

  onCancel() {
    pluginCall('close')
  }

  onSubmit() {
    const d = {
      str: this.state.valueAttr,
      startsFrom: this.state.sequence
    }
    pluginCall('onClickRename', JSON.stringify(d));
  }

  previewUpdate() {
    let renamed = [];
    data.selection.forEach((item) => {
      const options = {
        layerName: item.name,
        currIdx: item.idx,
        width: item.width,
        height: item.height,
        selectionCount: data.selectionCount,
        inputName: this.state.valueAttr,
        startsFrom: Number(this.state.sequence),
        pageName: data.pageName,
        parentName: item.parentName
      };
      renamed.push(rename(options));
    });
    this.setState({ previewData: renamed })
  }

  render() {
    const nameInputAttr = {
      id: "name",
      type: "text",
      forName: "Name:",
      wrapperClass: "inputName",
      autoFocus:true,
      value: this.state.valueAttr,
      onChange: this.onChange.bind(this),
      showClear: this.state.showClear,
      onClear: this.clearInput.bind(this),
      inputFocus: this.state.inputFocus
    }

    const sequenceInputAttr = {
      id:"sequence",
      type: "number",
      forName:"Start Sequence from:",
      wrapperClass:"inputRight",
      value: this.state.sequence,
      autoFocus:false,
      onChange: this.onChangeSequence.bind(this),
    }

    const buttons = [
      { id: "currentLayer", char: "*", text: "Current Layer Name" },
      { id: "layerWidth", char: "%w", text: "Layer Width" },
      { id: "layerHeight", char: "%h", text: "Layer Height" },
      { id: "sequenceAsc", char: "%n", text: "Num. Sequence ASC" },
      { id: "sequenceDesc", char: "%N", text: "Num. Sequence DESC" },
      { id: "sequenceAlpha", char: "%A", text: "Alphabet Sequence" },
      { id: "pageName", char: "%p", text: "Page Name" },
      { id: "parentName", char: "%o", text: "Parent Name" },
    ];

    const listItems = buttons.map((d) => <li key={d.id} className="keywordBtn"><KeywordButton {...d} click={this.onButtonClicked.bind(this)} /></li>);

    return (
      <div class="container rename">
        <Input {...nameInputAttr} />
        <Input {...sequenceInputAttr} />

        <div id="keywordsWrapper">
          <span class="title">Keywords</span>
          <ul class="keywords">
            {listItems}
          </ul>
          <Preview data={this.state.previewData} />
        </div>
        <div id="footer">
          <button id="cancelBtn" class="grey" onClick={this.onCancel}>Cancel</button>
          <button id="submitBtn" onClick={this.onSubmit.bind(this)}>Rename</button>
        </div>
      </div>
  )
  }
}

export default RenameLayer
