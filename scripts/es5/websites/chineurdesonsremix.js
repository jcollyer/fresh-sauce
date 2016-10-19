'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chineurdesonsremix = chineurdesonsremix;

var _config = require('../config');

var siteData = {
  mainSite: 'http://www.chineurdesons.com/nu-disco/',
  mainSiteElements: '',
  subSiteElements: '.post-thumb',
  noSubSite: true,
  genre: ['remix']
};

function chineurdesonsremix() {
  (0, _config.requestWebsite)(siteData);
}