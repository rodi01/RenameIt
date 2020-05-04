import { createGlobalStyle } from 'styled-components'
import { ButtonStyles } from '../GlobalStyles'

export default createGlobalStyle`
    .dropdown {
      position: relative;
      display: inline-block;
      align-self: center;
      font-size: 12px;
    }
    
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      display: none;
      float: left;
      min-width: 10rem;
      padding: 8px 0;
      margin: 2px 0 0;
      color: ${(props) => props.theme.input.color};
      text-align: left;
      list-style: none;
      background-color: ${(props) => props.theme.input.background};
      background-clip: padding-box;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      box-shadow: 0px 3px 15px 0px rgba(0,0,0,0.15);
    }

    .dropdown-menu a, .dropdown-menu a:link, .dropdown-menu a:visited { 
      display: block;
      color: ${(props) => props.theme.previewColor};
      padding: 6px 8px;
      text-decoration: none;
      cursor: default;

      &:active, &:focus {
        outline: 0;
        background-color: ${(props) => props.theme.button.bgActive};
       }
     }

    .dropdown-toggle {
      ${ButtonStyles}
      height: 30px;
      padding: 0;
      width: 40px;
      .caret { display: none; }
      svg { margin-top: 2px; }
    }

    .dropdown-menu-right {
      right: 0;
      left: auto;
    }

    .dropdown-menu[x-placement^="top"], .dropdown-menu[x-placement^="right"], .dropdown-menu[x-placement^="bottom"], .dropdown-menu[x-placement^="left"] {
      right: auto;
      bottom: auto;
    }

    .dropdown-divider {
      height: 0;
      margin: 0.5rem 0;
      overflow: hidden;
      border-top: 1px solid #e9ecef;
    }

    .dropdown-menu.show {
      display: block;
    }

    .dropdown-header {
      display: block;
      padding: 0 8px 8px;
      margin-bottom: 0;
      color: ${(props) => props.theme.textColor};
      white-space: nowrap;
      opacity: 0.8;
    }

    .dropdown.open .dropdown-menu { display: block; }

    #seqTypeDD { width: 100%; padding: 0 10px; text-align: left; padding: 2px 8px; height: auto; }

    #seqTypeDD:after {
      display: inline-block;
      margin-left: 8px;
      vertical-align: 1px;
      content: "";
      border-top: 5px solid;
      border-right: 5px solid transparent;
      border-bottom: 0;
      border-left: 5px solid transparent;
      position: absolute;
      right: 8px;
      top: 12px;
      }
    
    .sequenceDD { flex-grow: 1;  }
    .sequenceDD .dropdown-menu { padding: 0; width: 100%; }
    .sequenceDD .menuIcon {  }
    .dropdown-menu a.menuIcon { line-height: 24px; }
    .dropIc { marging-right: 8px; }
    // .dropdown-menu a.layerListIc { background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjFweCIgaGVpZ2h0PSIyMXB4IiB2aWV3Qm94PSIwIDAgMjEgMjEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDY0ICg5MzUzNykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+bGF5ZXJMaXN0X2ljPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImxheWVyTGlzdF9pYyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAuNTAwMDAwLCAxMC41MDAwMDApIHNjYWxlKDEsIC0xKSByb3RhdGUoLTkwLjAwMDAwMCkgdHJhbnNsYXRlKC0xMC41MDAwMDAsIC0xMC41MDAwMDApIHRyYW5zbGF0ZSgtMC4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiM3ODkwOUMiIG9wYWNpdHk9IjAuMyIgeD0iMCIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iMjEiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiM3ODkwOUMiIG9wYWNpdHk9IjAuMyIgeD0iMy44IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyMSIgcng9IjEiPjwvcmVjdD4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iIzc4OTA5QyIgb3BhY2l0eT0iMC4zIiB4PSI3LjYiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIxIiByeD0iMSI+PC9yZWN0PgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjNzg5MDlDIiBvcGFjaXR5PSIwLjMiIHg9IjExLjQiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjEwIiByeD0iMSI+PC9yZWN0PgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjNzg5MDlDIiBvcGFjaXR5PSIwLjMiIHg9IjE1LjIiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjEwIiByeD0iMSI+PC9yZWN0PgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjNzg5MDlDIiBvcGFjaXR5PSIwLjMiIHg9IjE5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgcng9IjEiPjwvcmVjdD4KICAgICAgICAgICAgPGxpbmUgeDE9IjE1LjUiIHkxPSIxMi41IiB4Mj0iMTUuNSIgeTI9IjE5LjUiIGlkPSJQYXRoIiBzdHJva2U9IiMxMzg0RkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNS41MDAwMDAsIDE2LjAwMDAwMCkgcm90YXRlKC05MC4wMDAwMDApIHRyYW5zbGF0ZSgtMTUuNTAwMDAwLCAtMTYuMDAwMDAwKSAiPjwvbGluZT4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJQYXRoIiBzdHJva2U9IiMxMzg0RkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNy40NzQ4NzQsIDE1Ljk3NDg3NCkgcm90YXRlKC00NS4wMDAwMDApIHRyYW5zbGF0ZSgtMTcuNDc0ODc0LCAtMTUuOTc0ODc0KSAiIHBvaW50cz0iMTkuMjI0ODczNyAxNC4yMjQ4NzM3IDE5LjIyNDg3MzcgMTcuNzI0ODczNyAxNS43MjQ4NzM3IDE3LjcyNDg3MzciPjwvcG9seWxpbmU+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=") no-repeat 8px 50%; }
`
