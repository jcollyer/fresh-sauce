'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.neongoldrecords = neongoldrecords;

var _config = require('../config');

var siteData = {
  mainSite: 'http://neongoldrecords.com/',
  mainSiteElements: '',
  subSiteElements: '.post .post-bodycopy.clearfix p',
  noSubSite: true,
  genre: ['pop']
};

function neongoldrecords() {
  (0, _config.requestWebsite)(siteData);
}