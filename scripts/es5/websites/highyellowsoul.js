'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highyellowsoul = highyellowsoul;

var _config = require('../config');

var siteData = {
  mainSite: 'https://highyellowsoul.com/',
  mainSiteElements: '',
  subSiteElements: '.entry-content p .embed-youtube',
  noSubSite: true,
  genre: ['soul']
};

function highyellowsoul() {
  (0, _config.requestWebsite)(siteData);
}