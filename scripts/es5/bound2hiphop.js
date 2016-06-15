'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bound2hiphop = bound2hiphop;

var _config = require('./config');

var siteInfo = {
  mainSite: 'https://bound2hiphop.com/category/singles/',
  mainSiteElements: '.small-12.medium-4.columns .post-gallery a',
  subSiteElements: '.entry-content'
};

function bound2hiphop() {
  (0, _config.getAllIds)(function (ids) {
    (0, _config.requestMainSite)(ids, siteInfo);
  });
}
