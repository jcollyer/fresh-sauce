'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.theburningearremix = theburningearremix;

var _config = require('../config');

var siteData = {
  mainSite: 'http://www.theburningear.com/category/tracks/remixes/',
  mainSiteElements: '',
  subSiteElements: '.entry-content .avia-iframe-wrap',
  noSubSite: true,
  genre: ['remix']
};

function theburningearremix(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}