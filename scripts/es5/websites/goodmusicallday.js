'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goodmusicallday = goodmusicallday;

var _config = require('../config');

var siteData = {
  mainSite: 'http://goodmusicallday.com/category/music/',
  mainSiteElements: '',
  subSiteElements: 'a.data-song-parent',
  noSubSite: true,
  genre: ['hip-hop']
};

function goodmusicallday() {
  (0, _config.requestWebsite)(siteData);
}