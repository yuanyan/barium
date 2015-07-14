!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Barium=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var converter = require('./converter');
var hash = require('./hash');

var insertedRuleMap = {};
var head = document.head || document.getElementsByTagName('head')[0];
var styleTag;

function appendStyle(cssText) {

  if(!styleTag){
    styleTag = document.createElement('style')
    head.appendChild(styleTag)
  }

  if (styleTag.styleSheet) {
    styleTag.styleSheet.cssText += cssText
  } else {
    styleTag.appendChild(document.createTextNode(cssText))
  }

}

module.exports = {
  create: function(styles) {
    var cssText = '';
    var ruleMap = {};

    Object.keys(styles).forEach(function(val, key) {
      var rules = styles[val];
      var className = '_' + hash(JSON.stringify(rules)); // All with ._ prefix
      var selector = '.' + className;
      ruleMap[val] = className;

      if(!insertedRuleMap[selector]){
        cssText += converter.rulesToString(selector, rules);
      }
      insertedRuleMap[selector] = true;
    });

    appendStyle(cssText);

    return ruleMap;
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./converter":3,"./hash":5}],2:[function(require,module,exports){
'use strict';

var div = document.createElement('div');
var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
var domVendorPrefix;

// Helper function to get the proper vendor property name. (transition => WebkitTransition)
module.exports = function (prop) {

    if (prop in div.style) return prop;

    var prop = prop.charAt(0).toUpperCase() + prop.substr(1);
    if(domVendorPrefix){
        return domVendorPrefix + prop;
    }else{
        for (var i=0; i<prefixes.length; ++i) {
            var vendorProp = prefixes[i] + prop;
            if (vendorProp in div.style) {
                domVendorPrefix = prefixes[i];
                return vendorProp;
            }
        }
    }
}

},{}],3:[function(require,module,exports){
var escape = require('./escape');
var validator = require('./validator');
var getVendorPropertyName = require('react-kit/getVendorPropertyName');

var _uppercasePattern = /([A-Z])/g;
var msPattern = /^ms-/;

// Don't automatically add 'px' to these possibly-unitless properties.
// Borrowed from jquery.
var cssNumber = {
  'column-count': true,
  'fill-opacity': true,
  'flex': true,
  'flex-grow': true,
  'flex-shrink': true,
  'font-weight': true,
  'line-height': true,
  'opacity': true,
  'order': true,
  'orphans': true,
  'widows': true,
  'z-index': true,
  'zoom': true
}

function hyphenateProp(string) {
  // MozTransition -> -moz-transition
  // msTransition -> -ms-transition. Notice the lower case m
  // http://modernizr.com/docs/#prefixed
  // thanks a lot IE
  return string.replace(_uppercasePattern, '-$1')
    .toLowerCase()
    .replace(msPattern, '-ms-');
}


function processValueForProp(value, prop) {
  // 'content' is a special property that must be quoted
  if (prop === 'content') {
    return '"' + value + '"';
  }

  // Add px to numeric values
  if (!cssNumber[prop] && typeof value == 'number') {
    value += 'px'
  }else{
    value = escape(value);
  }

  return value;
}

function ruleToString(propName, value) {

  propName = getVendorPropertyName(propName);
  
  var cssPropName = hyphenateProp(propName);
  if (!validator.isValidValue(value)) {
    return '';
  }
  return cssPropName + ':' + processValueForProp(value, cssPropName) + ';';
}

function _rulesToStringHeadless(styleObj) {
  var markup = '';

  for (var key in styleObj) {
    if (!styleObj.hasOwnProperty(key)) {
      continue;
    }

    if (key[0] === ':' || key.substring(0, 6) === '@media') {
      continue;
    }
    markup += ruleToString(key, styleObj[key]);
  }
  return markup;
}

function rulesToString(className, styleObj) {
  var markup = '';
  var pseudos = '';
  var mediaQueries = '';

  for (var key in styleObj) {
    if (!styleObj.hasOwnProperty(key)) {
      continue;
    }
    // Skipping the special pseudo-selectors and media queries.
    if (key[0] === ':') {
      pseudos += className + key + '{' +
        _rulesToStringHeadless(styleObj[key]) + '}';
    } else if (key.substring(0, 6) === '@media') {

      mediaQueries += key + '{' + rulesToString(className, styleObj[key]) + '}';
    } else {
      markup += ruleToString(key, styleObj[key]);
    }
  }

  if (markup !== '') {
    markup = className + '{' + markup + '}';
  }

  return markup + pseudos + mediaQueries;
}

module.exports = {
  rulesToString: rulesToString
};

},{"./escape":4,"./validator":6,"react-kit/getVendorPropertyName":2}],4:[function(require,module,exports){
/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 * @api private
 */

module.exports = function(html) {
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

},{}],5:[function(require,module,exports){
module.exports = function (str) {
  var hash = 0;
  if (str.length == 0) return hash;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

},{}],6:[function(require,module,exports){
function isValidValue(value) {
  return value !== '' && (typeof value === 'number' || typeof value === 'string');
}

module.exports = {
  isValidValue: isValidValue
};

},{}]},{},[1])(1)
});