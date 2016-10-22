'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.djbooth = djbooth;

var _config = require('../config');

var siteData = {
  mainSite: 'http://djbooth.net/news',
  mainSiteElements: '.tracks.clearfix a',
  subSiteElements: '.entry-text',
  noSubSite: false,
  genre: ['hip-hop']
};

function djbooth() {
  (0, _config.requestWebsite)(siteData);
}