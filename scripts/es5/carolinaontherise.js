'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hrefs = [];
var $ = void 0;

(0, _config.getAllIds)(function (ids) {
  requestMainSite(ids);
});

function requestMainSite(ids) {
  (0, _request2.default)({
    method: 'GET',
    url: 'http://carolinaontherise.com/'
  }, function (err, response, body) {

    if (err) return console.error(err);

    $ = _cheerio2.default.load(body);

    // get list of urls
    $('.item-list').each(function () {
      var href = $('a', this).attr('href');
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
    $('.entry').each(function () {
      var url = $('p iframe', this).attr('src');
      (0, _config.pushTrack)(url, ids);
    });
  });
};
