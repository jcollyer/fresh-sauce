'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blahblahblahsciencesoul = blahblahblahsciencesoul;

var _config = require('../config');

var siteData = {
  mainSite: 'http://blahblahblahscience.com/category/soul',
  mainSiteElements: 'a.gridClickThru',
  subSiteElements: '.post .entry p',
  noSubSite: false,
  genre: ['soul']
};

function blahblahblahsciencesoul() {
  (0, _config.requestWebsite)(siteData);
}
