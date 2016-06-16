'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carolinaontherise = carolinaontherise;

var _config = require('./config');

var siteData = {
  mainSite: 'http://carolinaontherise.com/',
  mainSiteElements: '.item-list a',
  subSiteElements: '.entry p',
  noSubSite: false
};

function carolinaontherise() {
  (0, _config.requestWebsite)(siteData);
}
