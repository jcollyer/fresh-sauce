'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sophistefunk = sophistefunk;

var _config = require('../config');

var siteData = {
  mainSite: 'http://www.sophistefunk.com/',
  mainSiteElements: '',
  subSiteElements: '.entry-content.clearfix',
  noSubSite: true,
  genre: ['funk']
};

function sophistefunk(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}