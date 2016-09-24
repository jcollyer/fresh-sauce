'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emergingindiebands = emergingindiebands;

var _config = require('../config');

var siteData = {
  mainSite: 'http://emergingindiebands.com/category/music-videos-and-audio/',
  mainSiteElements: '',
  subSiteElements: '.entry-content.clearfix',
  noSubSite: true,
  genre: ['bands']
};

function emergingindiebands() {
  (0, _config.requestWebsite)(siteData);
}