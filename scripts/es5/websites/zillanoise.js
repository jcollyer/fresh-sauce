'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zillanoise = zillanoise;

var _config = require('../config');

var siteData = {
  mainSite: 'http://zillanoise.com/',
  mainSiteElements: '.mh-loop-header h3 a',
  subSiteElements: '.entry-content.clearfix p',
  noSubSite: false,
  genre: ['hip-hop']
};

function zillanoise() {
  (0, _config.requestWebsite)(siteData);
}