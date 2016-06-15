'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carolinaontherise = carolinaontherise;

var _config = require('./config');

var siteInfo = {
  mainSite: 'http://carolinaontherise.com/',
  mainSiteElements: '.item-list a',
  subSiteElements: '.entry p'
};

function carolinaontherise() {
  (0, _config.getAllIds)(function (ids) {
    (0, _config.requestMainSite)(ids, siteInfo);
  });
}
