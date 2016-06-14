'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bound2hiphop = bound2hiphop;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hrefs = [];
var $ = void 0;

function bound2hiphop() {
  (0, _config.getAllIds)(function (ids) {
    requestMainSite(ids);
  });

  function requestMainSite(ids) {
    (0, _request2.default)({
      method: 'GET',
      url: 'https://bound2hiphop.com/category/singles/'
    }, function (err, response, body) {

      if (err) return console.error(err);

      $ = _cheerio2.default.load(body);

      // get list of urls
      $('.small-12.medium-4.columns').each(function () {
        var href = $('.post-gallery a', this).attr('href');
        hrefs.push(href);
      });

      //get ids from soundcloud and youtube
      hrefs.map(function (href) {
        getTrack(href, ids);
      });
    });
  }

  var getTrack = function getTrack(href, ids) {
    (0, _request2.default)({ url: href }, function (err, response, body) {
      if (err) return console.error(err);
      $ = _cheerio2.default.load(body);
      $('.entry-content').each(function () {
        var url = $('iframe', this).attr('src');
        (0, _config.pushTrack)(url, ids);
      });
    });
  };
}
