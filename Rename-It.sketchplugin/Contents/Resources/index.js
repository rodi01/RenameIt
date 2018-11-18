/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/views/theme/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/views/theme/dark.js":
/*!***************************************!*\
  !*** ./resources/views/theme/dark.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  text: "#6a7480",
  primary: "#fff",
  bg: "#222020",
  input: {
    background: "#fff",
    shadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
    color: "#252525"
  },
  inputActive: {
    border: "3px solid rgba(59,153,252,0.50)"
  },
  label: {
    color: "#242424"
  },
  button: {
    color: "#000000",
    bg: "linear-gradient(-180deg, #FEFEFE 0%, #F3F3F3 100%)",
    border: "1px solid rgba(0,0,0,0.10)",
    shadow: "1px solid rgba(0,0,0,0.10)",
    active: "linear-gradient(-180deg, #6CB3FA 0%, #067DFF 100%)",
    activeBorder: "#005CFF",
    activeColor: "#fff"
  }
};
exports.default = _default;

/***/ }),

/***/ "./resources/views/theme/index.js":
/*!****************************************!*\
  !*** ./resources/views/theme/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dark = _interopRequireDefault(__webpack_require__(/*! ./dark */ "./resources/views/theme/dark.js"));

var _light = _interopRequireDefault(__webpack_require__(/*! ./light */ "./resources/views/theme/light.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var _default = function _default(theme) {
  if (theme === "dark") {
    return _dark.default;
  }

  return _light.default;
};

exports.default = _default;

/***/ }),

/***/ "./resources/views/theme/light.js":
/*!****************************************!*\
  !*** ./resources/views/theme/light.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  text: "#747474",
  bg: "#F7F7F7",
  input: {
    background: "#FBFBFB",
    color: "#505050",
    border: "#E4E4E4",
    borderActive: "#1384FF"
  },
  button: {
    color: "#505050",
    bgColor: "#FBFBFB",
    border: "#E4E4E4",
    bgActive: "#F3F2F5"
  },
  secondaryButton: {
    borderColor: "#B2AEBD",
    textColor: "#817B8F"
  },
  CTAButton: {
    bgColor: "#1384FF",
    textColor: "#fff"
  }
};
exports.default = _default;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map