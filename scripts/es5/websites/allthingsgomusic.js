'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allthingsgomusic = allthingsgomusic;

var _config = require('../config');

var siteData = {
  mainSite: 'https://www.allthingsgomusic.com/popular/month',
  mainSiteElements: 'section.entry-summary a',
  subSiteElements: 'section.entry-content .content p',
  noSubSite: false,
  genre: ['pop']
};

function allthingsgomusic() {
  (0, _config.requestWebsite)(siteData);
}
