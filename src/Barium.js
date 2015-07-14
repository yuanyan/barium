var React = require('react');
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

      if(!insertedRuleMap[selector]){
        ruleMap[val] = className;
        cssText += converter.rulesToString(selector, rules);
      }

      insertedRuleMap[selector] = true;
    });

    appendStyle(cssText);

    return ruleMap;
  }
}
