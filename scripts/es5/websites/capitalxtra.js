'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalxtra = capitalxtra;

var _config = require('../config');

var siteData = {
  mainSite: 'http://www.capitalxtra.com/new-music/latest/',
  mainSiteElements: 'article.last.cycle_start.cycle_end h3 a',
  subSiteElements: '#article_body_wrap .article_body',
  noSubSite: false,
  genre: ['pop']
};

function capitalxtra() {
  (0, _config.requestWebsite)(siteData);
}
