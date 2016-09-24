'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nialler9hiphop = nialler9hiphop;

var _config = require('../config');

var siteData = {
  mainSite: 'http://nialler9.com/new-music/rap-hip-hop/',
  mainSiteElements: 'h1.single-title a',
  subSiteElements: 'span.embed-youtube',
  noSubSite: false,
  genre: ['hip-hop']
};

function nialler9hiphop() {
  (0, _config.requestWebsite)(siteData);
}
