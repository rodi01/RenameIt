/*
 * @Author: Rodrigo Soares 
 * @Date: 2017-12-25 21:54:20 
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2018-11-21 09:45:20
 */
import React from "react"
import pluginCall from "sketch-module-web-view/client"
import mixpanel from "mixpanel-browser"
import styled from "styled-components"
import { mixpanelId } from "../../../../src/lib/Constants"
import { SecondaryButton, StyledH3, InputMargin } from "../GlobalStyles"

const H3 = styled(StyledH3)`
  margin-bottom: 16px;
`

const About = styled.div`
  margin-top: ${InputMargin};
  display: flex;
  flex-direction: column;
`

const Credits = styled.p`
  font-size: 12px;
  line-height: 1.3em;
  align-self: flex-end;
  margin-top: auto;
  span {
    text-decoration: underline;
  }
`

class Settings extends React.Component {
  constructor(props) {
    super(props)

    // Tracking
    mixpanel.init(mixpanelId)
  }

  onClearHistory() {
    pluginCall("onClearHistory")
  }

  moreInfo() {
    pluginCall("externalLinkClicked", "http://rodi01.github.io/RenameIt/")
  }

  twitter() {
    pluginCall("externalLinkClicked", "https://twitter.com/rodi01")
  }

  render() {
    return (
      <div className="container settings">
        <H3>History</H3>
        <SecondaryButton onClick={() => this.onClearHistory()}>
          Clear History
        </SecondaryButton>
        <About>
          <H3>About</H3>

          <SecondaryButton onClick={() => this.moreInfo()}>
            Plugin Website
          </SecondaryButton>
        </About>

        <Credits>
          Rename It is maintained by Rodrigo Soares.{" "}
          <span onClick={() => this.twitter()}>@rodi01</span>
        </Credits>
      </div>
    )
  }
}

export default Settings
