import escape from './escape';
import isValidValue from './validator';
import getVendorPropertyName from 'react-kit/getVendorPropertyName';

const _uppercasePattern = /([A-Z])/g;
const msPattern = /^ms-/;

// Don't automatically add 'px' to these possibly-unitless properties.
// Borrowed from jquery.
const cssNumber = {
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


const processValueForProp = (value, prop) => {
  // 'content' is a special property that must be quoted
  if (prop === 'content') {
    return `"${value}"`;
  }

  // Add px to numeric values
  if (!cssNumber[prop] && typeof value == 'number') {
    value += 'px'
  } else {
    value = escape(value);
  }

  return value;
}

export const ruleToString = (propName, value) => {

  propName = getVendorPropertyName(propName);

  var cssPropName = hyphenateProp(propName);
  if (!isValidValue(value)) {
    return '';
  }
  return `${cssPropName}: ${processValueForProp(value, cssPropName)};`;
}

const _rulesToStringHeadless = (styleObj) => {
  let markup = '';

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

export const rulesToString = (className, styleObj) => {
  let markup = '';
  let pseudos = '';
  let mediaQueries = '';

  for (var key in styleObj) {
    if (!styleObj.hasOwnProperty(key)) {
      continue;
    }
    // Skipping the special pseudo-selectors and media queries.
    if (key[0] === ':') {
      pseudos += `
      ${className}${key} {
        ${_rulesToStringHeadless(styleObj[key])}
      }
      `;
    } else if (key.substring(0, 6) === '@media') {

      mediaQueries += `
      ${key} {
        ${rulesToString(className, styleObj[key])}
      }
      `;
    } else {
      markup += ruleToString(key, styleObj[key]);
    }
  }

  if (markup !== '') {
    markup = `
    ${className} {
      ${markup}
    }
    `;
  }

  return `${markup}${pseudos}${mediaQueries}`;
};
