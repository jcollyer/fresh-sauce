'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anonymouslygifted = anonymouslygifted;

var _config = require('../config');

var siteData = {
  mainSite: 'http://anonymouslygifted.com/',
  mainSiteElements: '.postMain .post .more-link',
  subSiteElements: '.postMain .post',
  noSubSite: false,
  genre: ['hip-hop']
};

function anonymouslygifted() {
  (0, _config.requestWebsite)(siteData);
}
