/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-17T16:10:11-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T18:12:11-08:00
 */
import React from "react"

export default class Preview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: "",
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      preview: nextProps.data.filter((val) => val).join(", "),
    })
  }

  render() {
    return (
      <div id="preview">
        Preview: <strong>{this.state.preview}</strong>
      </div>
    )
  }
}
