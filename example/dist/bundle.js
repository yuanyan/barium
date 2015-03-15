require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/yuanyan/React/react-stylist/src/converter.js":[function(require,module,exports){
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

},{"./escape":"/Users/yuanyan/React/react-stylist/src/escape.js","./validator":"/Users/yuanyan/React/react-stylist/src/validator.js"}],"/Users/yuanyan/React/react-stylist/src/escape.js":[function(require,module,exports){
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

},{}],"/Users/yuanyan/React/react-stylist/src/validator.js":[function(require,module,exports){
function isValidValue(value) {
  return value !== '' && (typeof value === 'number' || typeof value === 'string');
}

module.exports = {
  isValidValue: isValidValue
};

},{}],"react-stylist":[function(require,module,exports){
var React = require('react');
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

},{"./converter":"/Users/yuanyan/React/react-stylist/src/converter.js","react":false}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29udmVydGVyLmpzIiwic3JjL2VzY2FwZS5qcyIsInNyYy92YWxpZGF0b3IuanMiLCJzcmMvU3R5bGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBlc2NhcGUgPSByZXF1aXJlKCcuL2VzY2FwZScpO1xudmFyIHZhbGlkYXRvciA9IHJlcXVpcmUoJy4vdmFsaWRhdG9yJyk7XG5cbnZhciBfdXBwZXJjYXNlUGF0dGVybiA9IC8oW0EtWl0pL2c7XG52YXIgbXNQYXR0ZXJuID0gL15tcy0vO1xuXG5mdW5jdGlvbiBoeXBoZW5hdGVQcm9wKHN0cmluZykge1xuICAvLyBNb3pUcmFuc2l0aW9uIC0+IC1tb3otdHJhbnNpdGlvblxuICAvLyBtc1RyYW5zaXRpb24gLT4gLW1zLXRyYW5zaXRpb24uIE5vdGljZSB0aGUgbG93ZXIgY2FzZSBtXG4gIC8vIGh0dHA6Ly9tb2Rlcm5penIuY29tL2RvY3MvI3ByZWZpeGVkXG4gIC8vIHRoYW5rcyBhIGxvdCBJRVxuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3VwcGVyY2FzZVBhdHRlcm4sICctJDEnKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UobXNQYXR0ZXJuLCAnLW1zLScpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVWYWx1ZUZvclByb3AodmFsdWUsIHByb3ApIHtcbiAgLy8gJ2NvbnRlbnQnIGlzIGEgc3BlY2lhbCBwcm9wZXJ0eSB0aGF0IG11c3QgYmUgcXVvdGVkXG4gIGlmIChwcm9wID09PSAnY29udGVudCcpIHtcbiAgICByZXR1cm4gJ1wiJyArIHZhbHVlICsgJ1wiJztcbiAgfVxuXG4gIHJldHVybiBlc2NhcGUodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBydWxlVG9TdHJpbmcocHJvcE5hbWUsIHZhbHVlKSB7XG4gIHZhciBjc3NQcm9wTmFtZSA9IGh5cGhlbmF0ZVByb3AocHJvcE5hbWUpO1xuICBpZiAoIXZhbGlkYXRvci5pc1ZhbGlkVmFsdWUodmFsdWUpKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIHJldHVybiBjc3NQcm9wTmFtZSArICc6JyArIGVzY2FwZVZhbHVlRm9yUHJvcCh2YWx1ZSwgY3NzUHJvcE5hbWUpICsgJzsnO1xufVxuXG5mdW5jdGlvbiBfcnVsZXNUb1N0cmluZ0hlYWRsZXNzKHN0eWxlT2JqKSB7XG4gIHZhciBtYXJrdXAgPSAnJztcblxuICBmb3IgKHZhciBrZXkgaW4gc3R5bGVPYmopIHtcbiAgICBpZiAoIXN0eWxlT2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChrZXlbMF0gPT09ICc6JyB8fCBrZXkuc3Vic3RyaW5nKDAsIDYpID09PSAnQG1lZGlhJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIG1hcmt1cCArPSBydWxlVG9TdHJpbmcoa2V5LCBzdHlsZU9ialtrZXldKTtcbiAgfVxuICByZXR1cm4gbWFya3VwO1xufVxuXG5mdW5jdGlvbiBydWxlc1RvU3RyaW5nKGNsYXNzTmFtZSwgc3R5bGVPYmopIHtcbiAgdmFyIG1hcmt1cCA9ICcnO1xuICB2YXIgcHNldWRvcyA9ICcnO1xuICB2YXIgbWVkaWFRdWVyaWVzID0gJyc7XG5cbiAgZm9yICh2YXIga2V5IGluIHN0eWxlT2JqKSB7XG4gICAgaWYgKCFzdHlsZU9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgLy8gU2tpcHBpbmcgdGhlIHNwZWNpYWwgcHNldWRvLXNlbGVjdG9ycyBhbmQgbWVkaWEgcXVlcmllcy5cbiAgICBpZiAoa2V5WzBdID09PSAnOicpIHtcbiAgICAgIHBzZXVkb3MgKz0gY2xhc3NOYW1lICsga2V5ICsgJ3snICtcbiAgICAgICAgX3J1bGVzVG9TdHJpbmdIZWFkbGVzcyhzdHlsZU9ialtrZXldKSArICd9JztcbiAgICB9IGVsc2UgaWYgKGtleS5zdWJzdHJpbmcoMCwgNikgPT09ICdAbWVkaWEnKSB7XG5cbiAgICAgIG1lZGlhUXVlcmllcyArPSBrZXkgKyAneycgKyBydWxlc1RvU3RyaW5nKGNsYXNzTmFtZSwgc3R5bGVPYmpba2V5XSkgKyAnfSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcmt1cCArPSBydWxlVG9TdHJpbmcoa2V5LCBzdHlsZU9ialtrZXldKTtcbiAgICB9XG4gIH1cblxuICBpZiAobWFya3VwICE9PSAnJykge1xuICAgIG1hcmt1cCA9IGNsYXNzTmFtZSArICd7JyArIG1hcmt1cCArICd9JztcbiAgfVxuXG4gIHJldHVybiBtYXJrdXAgKyBwc2V1ZG9zICsgbWVkaWFRdWVyaWVzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcnVsZXNUb1N0cmluZzogcnVsZXNUb1N0cmluZ1xufTtcbiIsIi8qKlxuICogRXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGh0bWwuXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGh0bWwpIHtcbiAgcmV0dXJuIFN0cmluZyhodG1sKVxuICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG59XG4iLCJmdW5jdGlvbiBpc1ZhbGlkVmFsdWUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSAnJyAmJiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzVmFsaWRWYWx1ZTogaXNWYWxpZFZhbHVlXG59O1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBjb252ZXJ0ZXIgPSByZXF1aXJlKCcuL2NvbnZlcnRlcicpO1xuXG52YXIgU3R5bGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTdHlsaXN0XCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIHN0eWxlczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbGluazogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG5cbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIHZhciBzdHlsZXMgPSB0aGlzLnByb3BzLnN0eWxlcztcbiAgICAgICAgaWYoc3R5bGVzKXtcblxuICAgICAgICAgICAgdmFyIHN0eWxlc1N0cmluZyA9ICcnO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwga2V5KXtcbiAgICAgICAgICAgICAgICB2YXIgcnVsZXMgPSBzdHlsZXNbdmFsXTtcbiAgICAgICAgICAgICAgICBzdHlsZXNTdHJpbmcgKz0gY29udmVydGVyLnJ1bGVzVG9TdHJpbmcodmFsLCBydWxlcylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb21wb25lbnQgPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcInN0eWxlXCIsIG51bGwsIFxuICAgICAgICAgICAgIHN0eWxlc1N0cmluZ1xuICAgICAgICAgICAgKSlcbiAgICAgICAgfWVsc2UgaWYodGhpcy5wcm9wcy5saW5rKXtcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLCB7cmVsOiBcInN0eWxlc2hlZXRcIiwgaHJlZjogdGhpcy5wcm9wLmxpbmt9KSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGlzdDtcbiJdfQ==
