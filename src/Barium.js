import React from 'react';
import { rulesToString, ruleToString } from './converter';
import hash from './hash';
import getVendorPrefix from "react-kit/getVendorPrefix";

const vendorPrefix = getVendorPrefix();
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
      cssText += rulesToString(selector, rules);
    }
    insertedRuleMap[selector] = true;
  });

  appendStyle(cssText);

  return ruleMap;
};

export const createKeyframes = (keyframes) => {
  let animationName = `_${hash(JSON.stringify(keyframes))}`;
  let cssText = `
    @${vendorPrefix}keyframes ${animationName} {
  `;

  for (var frame in keyframes) {
    cssText += `
      ${frame} {
    `;

    for (var cssProperty in keyframes[frame]) {
      let cssValue = keyframes[frame][cssProperty];
      cssText += ruleToString(cssProperty, cssValue);
    }

    cssText += "}";
  }

  cssText += "}";

  appendStyle(cssText);

  return animationName;
};

export const createAnimations = (animations) => {
  let animationMap = {};
  Object.keys(animations).forEach((animation) => {
    animationMap[animation] = createKeyframes(animations[animation]);
  });
  return animationMap;
}
