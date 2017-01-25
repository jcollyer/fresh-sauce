'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nialler9electro = nialler9electro;

var _config = require('../config');

var siteData = {
  mainSite: 'http://nialler9.com/new-music/electronic-music/',
  mainSiteElements: 'h1.single-title a',
  subSiteElements: 'span.embed-youtube',
  noSubSite: false,
  genre: ['chill']
};

function nialler9electro(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}