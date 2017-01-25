'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thenewlofi = thenewlofi;

var _config = require('../config');

var siteData = {
  mainSite: 'http://thenewlofi.com/',
  mainSiteElements: '',
  subSiteElements: '.post .entry p',
  noSubSite: true,
  genre: ['bands']
};

function thenewlofi(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}