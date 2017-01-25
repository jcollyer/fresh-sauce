'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wearegoingsolo = wearegoingsolo;

var _config = require('../config');

var siteData = {
  mainSite: 'http://www.wearegoingsolo.com/tracks/',
  mainSiteElements: '.content-ombre .content-block  a',
  subSiteElements: '.content-block.single-post .block-content',
  noSubSite: false,
  genre: ['chill', 'bands']
};

function wearegoingsolo(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}