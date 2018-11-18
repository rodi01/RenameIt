/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-27T16:56:23-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T15:28:23-08:00
 */
import React from "react"
import { Route, Switch } from "react-router-dom"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import RenameLayer from "./components/renameLayer"
import FindReplaceLayer from "./components/findReplaceLayer"
import Settings from "./components/settings"
import getTheme from "./theme/index"

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.bg};
  }
`
// Theme
window.theme = window.theme || "light"
const theme = getTheme(window.theme)

export default () => (
  <ThemeProvider theme={theme}>
    <div>
      <GlobalStyle />
      <Switch>
        <Route exact path="/find_replace" component={FindReplaceLayer} />
        <Route exact path="/rename" component={RenameLayer} />
        <Route exact path="/settings" component={Settings} />
      </Switch>
    </div>
  </ThemeProvider>
)
