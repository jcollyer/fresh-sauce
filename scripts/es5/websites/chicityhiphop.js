'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chicityhiphop = chicityhiphop;

var _config = require('../config');

var siteData = {
  mainSite: 'http://www.chicityhiphop.net/',
  mainSiteElements: '',
  subSiteElements: '.entry-content',
  noSubSite: true,
  genre: ['hip-hop']
};

function chicityhiphop() {
  (0, _config.requestWebsite)(siteData);
}