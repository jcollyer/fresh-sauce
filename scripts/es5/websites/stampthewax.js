'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stampthewax = stampthewax;

var _config = require('../config');

var siteData = {
  mainSite: 'http://www.stampthewax.com/category/new-music/',
  mainSiteElements: '.entry-image  a',
  subSiteElements: '.single-box.clearfix.entry-content p',
  noSubSite: false,
  genre: ['funk']
};

function stampthewax(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}