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

    #seqTypeDD { width: 100%; padding: 0 10px; text-align: left; }

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
      top: 9px;
      }
    
    .sequenceDD { flex-grow: 1; }
    .sequenceDD .dropdown-menu { padding: 0; width: 100%; }
`
