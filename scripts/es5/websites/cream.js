'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cream = cream;

var _config = require('../config');

var siteData = {
  mainSite: 'http://www.cream.cz/',
  mainSiteElements: '.featured-thumb a',
  subSiteElements: '.entry-content',
  noSubSite: false,
  genre: ['hip-hop']
};

function cream() {
  (0, _config.requestWebsite)(siteData);
}