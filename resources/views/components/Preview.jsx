/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-17T16:10:11-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T18:12:11-08:00
 */
import React from "react"
import styled from "styled-components"

const StyledPreview = styled.div`
  margin-top: 18px;
  font-size: 13px;
  color: ${props => props.theme.previewColor};
  height: 32px;
  overflow: hidden;
`

export default class Preview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      preview: nextProps.data.filter(val => val).join(", ")
    })
  }

  renderPreviewText() {
    if (this.state.preview === "") {
      return <StyledPreview>&nbsp;</StyledPreview>
    }
    return <StyledPreview>Preview: {this.state.preview}</StyledPreview>
  }

  render() {
    return <div id="preview">{this.renderPreviewText()}</div>
  }
}
