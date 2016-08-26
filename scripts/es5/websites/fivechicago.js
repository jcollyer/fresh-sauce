'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fivechicago = fivechicago;

var _config = require('../config');

var siteData = {
  mainSite: 'http://5chicago.com/category/tracks/new-releases/',
  mainSiteElements: '.td_module_11 .td-module-thumb a',
  subSiteElements: '.td-post-featured-video .wpb_video_wrapper',
  noSubSite: false,
  genre: ['house']
};

function fivechicago() {
  (0, _config.requestWebsite)(siteData);
}
