'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anonymouslygifted = anonymouslygifted;

var _config = require('./config');

var siteInfo = {
  mainSite: 'http://anonymouslygifted.com/',
  mainSiteElements: '.postMain .post .more-link',
  subSiteElements: '.postMain .post'
};

function anonymouslygifted() {
  (0, _config.getAllIds)(function (ids) {
    (0, _config.requestMainSite)(ids, siteInfo);
  });
}
