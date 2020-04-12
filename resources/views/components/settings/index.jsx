/*
 * @Author: Rodrigo Soares
 * @Date: 2017-12-25 21:54:20
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2019-10-27 17:44:51
 */
import React from 'react'
import styled from 'styled-components'
import {
  SecondaryButton,
  StyledH3,
  InputMargin,
  defaultPadding,
} from '../GlobalStyles'

const SettingsWrapper = styled.div`
  display: block;
  padding: ${defaultPadding};
`

const H3 = styled(StyledH3)`
  margin-bottom: 8px;
`

const About = styled.div`
  margin-top: ${InputMargin};
`

const Credits = styled.p`
  font-size: 12px;
  line-height: 1.3em;
  margin-top: ${defaultPadding};
  span {
    text-decoration: underline;
  }
`

class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.toggleChange = this.toggleChange.bind(this)

    this.state = {
      isChecked: true,
    }
  }

  onClearHistory() {
    window.postMessage('onClearHistory')
  }

  moreInfo() {
    window.postMessage(
      'externalLinkClicked',
      'http://rodi01.github.io/RenameIt/'
    )
  }

  twitter() {
    window.postMessage('externalLinkClicked', 'https://twitter.com/rodi01')
  }

  toggleChange() {
    this.setState({
      isChecked: !this.state.isChecked,
    })
  }

  render() {
    return (
      <SettingsWrapper>
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
          Rename It is maintained by Rodrigo Soares.{' '}
          <span onClick={() => this.twitter()}>@rodi01</span>
        </Credits>
      </SettingsWrapper>
    )
  }
}

export default Settings
