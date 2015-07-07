var React = require('react');
var insertRule = require('react-kit/insertRule');
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

module.exports = {
  create: function(styles){
    var stylesString = '';
    Object.keys(styles).forEach(function(val, key){
        var rules = styles[val];
        var className = '.' + hashCode(JSON.stringify(rules));
        stylesString += converter.rulesToString(className, rules)
    });

    insertRule(styleString);
  }
}
