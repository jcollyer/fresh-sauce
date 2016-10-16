'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beatmecca = beatmecca;

var _config = require('../config');

var siteData = {
  mainSite: 'http://beatmecca.com/music/',
  mainSiteElements: '.pt-cv-ifield a',
  subSiteElements: '.entry-media.sc-iframe',
  noSubSite: false,
  genre: ['beats']
};

function beatmecca() {
  (0, _config.requestWebsite)(siteData);
}