'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crackedatoms = crackedatoms;

var _config = require('../config');

var siteData = {
  mainSite: 'http://crackedatoms.com/',
  mainSiteElements: '',
  subSiteElements: '.content',
  noSubSite: true,
  genre: ['hip-hop', 'pop']
};

function crackedatoms(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}