'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anonymouslygifted = anonymouslygifted;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hrefs = [];
var $ = void 0;

function anonymouslygifted() {
  (0, _config.getAllIds)(function (ids) {
    requestMainSite(ids);
  });

  function requestMainSite(ids) {
    (0, _request2.default)({
      method: 'GET',
      url: 'http://anonymouslygifted.com/'
    }, function (err, response, body) {

      if (err) return console.error(err);

      $ = _cheerio2.default.load(body);

      // get list of urls
      $('.postMain .post .more-link').each(function () {
        var href = $(this).attr('href');
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
      $('.postMain .post').each(function () {
        var url = $('iframe', this).attr('src');
        if (url) {
          (0, _config.pushTrack)(url, ids);
        }
      });
    });
  };
}
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carolinaontherise = carolinaontherise;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hrefs = [];
var $ = void 0;

function carolinaontherise() {
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
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllIds = getAllIds;
exports.pushTrack = pushTrack;
exports.requestSoundCloud = requestSoundCloud;
exports.requestYouTube = requestYouTube;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ref = new _firebase2.default('https://fresh-sauce.firebaseio.com/');
var idsRef = ref.child('ids');
var tracksRef = ref.child('items');

function getAllIds(callback) {
  idsRef.once('value', function (snapshot) {
    getIds(snapshot.val());
  });

  function getIds(obj) {
    var ids = [];
    Object.keys(obj).map(function (track) {
      ids.push(obj[track].id);
    });

    filterOutDuplicates(ids);
  }

  function filterOutDuplicates(ids) {
    var filteredIds = ids.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    });

    callback(filteredIds);
  }
}

function pushTrack(url, ids) {
  var idLength = void 0,
      thisType = void 0;
  if (url.split(".")[1] === "soundcloud") {
    idLength = 9;
    var thisId = url.substr(url.lastIndexOf("/") + 1, idLength);
    if (ids.indexOf(parseInt(thisId)) < 0) {
      requestSoundCloud(thisId);
    } else {
      console.log("ID already added");
    }
  } else if (url.split(".")[1] === "youtube") {
    idLength = 11;
    var _thisId = url.substr(url.lastIndexOf("/") + 1, idLength);
    if (ids.indexOf(_thisId) < 0) {
      requestYouTube(_thisId);
    } else {
      console.log("ID already added");
    }
  } else {
    console.log("Not soundcloud or youtube ID");
    return;
  }

  setTimeout(function () {
    console.log("bye...");
    process.exit();
  }, 3500);
}

function requestSoundCloud(id) {
  var url = 'https://api.soundcloud.com/tracks/' + id + '.json?client_id=b5e21578d92314bc753b90ea7c971c1e';
  (0, _request2.default)(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var formattedBody = JSON.parse(body);
      var track = {};
      track.id = formattedBody.id;
      track.original_content_size = formattedBody.original_content_size;
      track.tag_list = formattedBody.tag_list;
      track.permalink = formattedBody.permalink;
      track.genre = formattedBody.genre;
      track.title = formattedBody.title;
      track.artwork_url = formattedBody.artwork_url;
      track.artist = formattedBody.user.username;
      track.likes = 0;
      track.kind = 'sc';

      // Add data to firebase
      tracksRef.push({ track: track });
      idsRef.push({ id: track.id });
      console.log('Added Track ID: ' + id + ' TYPE: sc');
    }
  });
}

function requestYouTube(id) {
  var url = 'https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=AIzaSyDCoZw9dsD8pz3WxDOyQa_542XCDfpCwB4&part=snippet';
  (0, _request2.default)(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var formattedBody = JSON.parse(body);
      var track = {};
      track.id = id;
      track.tag_list = formattedBody.items[0].snippet.tags;
      track.title = formattedBody.items[0].snippet.title;
      track.description = formattedBody.items[0].snippet.description;
      track.artwork_url = formattedBody.items[0].snippet.thumbnails.default.url;
      track.likes = 0;
      track.kind = 'yt';

      // Add data to firebase
      tracksRef.push({ track: track });
      idsRef.push({ id: track.id });
      console.log('Added Track ID: ' + id + ' TYPE: yt');
    }
  });
}
'use strict';

var _anonymouslygifted = require('./anonymouslygifted.js');

var _bound2hiphop = require('./bound2hiphop.js');

var _carolinaontherise = require('./carolinaontherise.js');

(0, _anonymouslygifted.anonymouslygifted)();
(0, _bound2hiphop.bound2hiphop)();
(0, _carolinaontherise.carolinaontherise)();
