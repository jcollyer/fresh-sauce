'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beatspill = beatspill;

var _config = require('../config');

var siteData = {
  mainSite: 'https://beatspill.com/',
  mainSiteElements: '',
  subSiteElements: '.entry',
  noSubSite: true,
  genre: ['hip-hop']
};

function beatspill(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}