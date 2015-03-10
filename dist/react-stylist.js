!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Stylist=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var converter = require('./converter');

var Stylist = React.createClass({displayName: "Stylist",
    propTypes: {
        styles: React.PropTypes.object,
        link: React.PropTypes.string
    },

    render: function() {


        var component = null;
        var styles = this.props.styles;
        if(styles){

            var stylesString = '';
            Object.keys(styles).forEach(function(val, key){
                var rules = styles[val];
                stylesString += converter.rulesToString(val, rules)
            });

            component = (React.createElement("style", null, 
             stylesString
            ))
        }else if(this.props.link){
            component = (React.createElement("link", {rel: "stylesheet", href: this.prop.link}))
        }

        return component;
    }
});

module.exports = Stylist;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./converter":2}],2:[function(require,module,exports){
var escape = require('./escape');
var validator = require('./validator');

var _uppercasePattern = /([A-Z])/g;
var msPattern = /^ms-/;

function hyphenateProp(string) {
  // MozTransition -> -moz-transition
  // msTransition -> -ms-transition. Notice the lower case m
  // http://modernizr.com/docs/#prefixed
  // thanks a lot IE
  return string.replace(_uppercasePattern, '-$1')
    .toLowerCase()
    .replace(msPattern, '-ms-');
}

function escapeValueForProp(value, prop) {
  // 'content' is a special property that must be quoted
  if (prop === 'content') {
    return '"' + value + '"';
  }

  return escape(value);
}

function ruleToString(propName, value) {
  var cssPropName = hyphenateProp(propName);
  if (!validator.isValidValue(value)) {
    return '';
  }
  return cssPropName + ':' + escapeValueForProp(value, cssPropName) + ';';
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

},{"./escape":3,"./validator":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
function isValidValue(value) {
  return value !== '' && (typeof value === 'number' || typeof value === 'string');
}

module.exports = {
  isValidValue: isValidValue
};

},{}]},{},[1])(1)
});