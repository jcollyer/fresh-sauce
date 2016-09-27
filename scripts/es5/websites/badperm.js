'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.badperm = badperm;

var _config = require('../config');

var siteData = {
  mainSite: 'http://www.bad-perm.com/fresh-cuts-music/',
  mainSiteElements: '.block-item-big.post a',
  subSiteElements: '.post-entry p',
  noSubSite: false,
  genre: ['hip-hop']
};

function badperm() {
  (0, _config.requestWebsite)(siteData);
}