'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dotgotit = dotgotit;

var _config = require('../config');

var siteData = {
  mainSite: 'http://www.dotgotit.com/',
  mainSiteElements: '.post .new-post a',
  subSiteElements: '.new-post',
  noSubSite: false,
  genre: ['hip-hop']
};

function dotgotit() {
  (0, _config.requestWebsite)(siteData);
}