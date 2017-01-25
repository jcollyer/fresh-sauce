'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.soulmusicsongs = soulmusicsongs;

var _config = require('../config');

var siteData = {
  mainSite: 'http://soulmusicsongs.tumblr.com/',
  mainSiteElements: '',
  subSiteElements: '.entry',
  noSubSite: true,
  genre: ['classic']
};

function soulmusicsongs(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}