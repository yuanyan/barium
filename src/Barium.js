var React = require('react');
var converter = require('./converter');

function hashCode(str) {
  var hash = 0;
  if (str.length == 0) return hash;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

var head = document.head || document.getElementsByTagName('head')[0];
function insertStyle(cssText){

  var styleTag = document.createElement('style')
  styleTag.type = 'text/css'

  if (styleTag.styleSheet) {
      styleTag.styleSheet.cssText = cssText
  } else {
      styleTag.appendChild(document.createTextNode(cssText))
  }

  head.appendChild(styleTag)
}

module.exports = {
  create: function(styles){
    var stylesString = '';
    var stylesMap = {};
    Object.keys(styles).forEach(function(val, key){
        var rules = styles[val];
        var className = '_' + hashCode(JSON.stringify(rules)); // All with ._ prefix
        stylesMap[val] = className;
        stylesString += converter.rulesToString('.' + className, rules);
    });

    insertStyle(stylesString);

    return stylesMap;
  }
}
