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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "dark",
  text: "#E6E4EB",
  bg: "#2D2D2D",
  previewColor: "#F3F2F5",
  input: {
    background: "#373737",
    color: "#F3F2F5",
    border: "#454545",
    borderActive: "#1384FF"
  },
  button: {
    color: "#F3F2F5",
    bgColor: "rgba(255,255,255,0.25)",
    border: "#636363",
    bgActive: "rgba(255,255,255,0.10)"
  },
  secondaryButton: {
    borderColor: "#636363",
    textColor: "#F3F2F5"
  },
  CTAButton: {
    bgColor: "#1384FF",
    textColor: "#fff",
    bgActive: "#0F72DB"
  },
  radio: {
    selectedColor: "#1384FF",
    border: "#1384FF"
  }
});

/***/ }),

/***/ "./resources/views/theme/index.js":
/*!****************************************!*\
  !*** ./resources/views/theme/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dark */ "./resources/views/theme/dark.js");
/* harmony import */ var _light__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./light */ "./resources/views/theme/light.js");


/* harmony default export */ __webpack_exports__["default"] = (function (theme) {
  if (theme === "dark") {
    return _dark__WEBPACK_IMPORTED_MODULE_0__["default"];
  }

  return _light__WEBPACK_IMPORTED_MODULE_1__["default"];
});

/***/ }),

/***/ "./resources/views/theme/light.js":
/*!****************************************!*\
  !*** ./resources/views/theme/light.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "light",
  text: "#747474",
  bg: "#F7F7F7",
  previewColor: "#242424",
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
    textColor: "#fff",
    bgActive: "#0F72DB"
  },
  radio: {
    selectedColor: "#969696",
    border: "#969696"
  }
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map