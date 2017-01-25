'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chineurdesonschill = chineurdesonschill;

var _config = require('../config');

var siteData = {
  mainSite: 'http://www.chineurdesons.com/chillout/',
  mainSiteElements: '',
  subSiteElements: '.post-thumb',
  noSubSite: true,
  genre: ['chill']
};

function chineurdesonschill(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}