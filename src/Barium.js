import React from 'react';
import converter from './converter';
import hash from './hash';

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

export const create = (styles) => {
  let cssText = '';
  let ruleMap = {};

  Object.keys(styles).forEach((val, key) => {
    let rules = styles[val];
    let className = `_${hash(JSON.stringify(rules))}`; // All with ._ prefix
    let selector = `.${className}`;
    ruleMap[val] = className;

    if(!insertedRuleMap[selector]){
      cssText += converter.rulesToString(selector, rules);
    }
    insertedRuleMap[selector] = true;
  });

  appendStyle(cssText);

  return ruleMap;
};

export const createKeyframes = (styles) => {
  var cssText = '';
  var ruleMap = {};

  Object.keys(styles).forEach((val, key) => {
        let rules = styles[val];
        let keyframeName = `_${hash(JSON.stringify(rules))}`;
        let keyframeRule = ` @keyframes ${keyframeName} {${rules}} `;
        ruleMap[val] = keyframeName;

    if(!insertedRuleMap[keyframeName]){
      cssText += keyframeRule;
    }
    insertedRuleMap[keyframeName] = true;
  });

  appendStyle(cssText);

  return ruleMap;
};
