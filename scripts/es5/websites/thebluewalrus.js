'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thebluewalrus = thebluewalrus;

var _config = require('../config');

var siteData = {
  mainSite: 'http://thebluewalrus.com/',
  mainSiteElements: '.post-img  a',
  subSiteElements: '.post-entry p',
  noSubSite: false,
  genre: ['soul']
};

function thebluewalrus(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}