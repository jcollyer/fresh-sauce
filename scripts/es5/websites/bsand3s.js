'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bsand3s = bsand3s;

var _config = require('../config');

var siteData = {
  mainSite: 'http://bsand3s.com/bostonhiphop/',
  mainSiteElements: '.entry-thumbnail.clearfix a',
  subSiteElements: '.entry-content.clearfix p',
  noSubSite: false,
  genre: ['hip-hop']
};

function bsand3s() {
  (0, _config.requestWebsite)(siteData);
}