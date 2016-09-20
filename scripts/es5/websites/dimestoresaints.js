'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dimestoresaints = dimestoresaints;

var _config = require('../config');

var siteData = {
  mainSite: 'https://dimestoresaints.wordpress.com/',
  mainSiteElements: '',
  subSiteElements: 'article .post-content',
  noSubSite: true,
  genre: ['chill']
};

function dimestoresaints() {
  (0, _config.requestWebsite)(siteData);
}
