'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sinimabeats = sinimabeats;

var _config = require('../config');

var siteData = {
  mainSite: 'http://sinimabeats.net/blog/',
  mainSiteElements: '',
  subSiteElements: '.content.clearfix',
  noSubSite: true,
  genre: ['beats']
};

function sinimabeats(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}