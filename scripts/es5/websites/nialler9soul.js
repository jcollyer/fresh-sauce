'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nialler9soul = nialler9soul;

var _config = require('../config');

var siteData = {
  mainSite: 'http://nialler9.com/new-music/soul-funk-r-b/',
  mainSiteElements: 'h1.single-title a',
  subSiteElements: 'span.embed-youtube',
  noSubSite: false,
  genre: ['soul']
};

function nialler9soul(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}