'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bound2hiphop = bound2hiphop;

var _config = require('./config');

var siteData = {
  mainSite: 'https://bound2hiphop.com/category/singles/',
  mainSiteElements: '.small-12.medium-4.columns .post-gallery a',
  subSiteElements: '.entry-content'
};

function bound2hiphop() {
  (0, _config.requestWebsite)(siteData);
}
