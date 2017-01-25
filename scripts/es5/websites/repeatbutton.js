'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatbutton = repeatbutton;

var _config = require('../config');

var siteData = {
  mainSite: 'http://www.repeatbutton.com/',
  mainSiteElements: '.home_post_box a',
  subSiteElements: '.single_inside_content div',
  noSubSite: false,
  genre: ['pop']
};

function repeatbutton(allIds) {
  (0, _config.requestWebsite)(siteData, allIds);
}