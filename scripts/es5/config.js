'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestWebsite = requestWebsite;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ref = new _firebase2.default('https://fresh-sauce.firebaseio.com/');
var idsRef = ref.child('ids');
var tracksRef = ref.child('items');
var sessionIds = [];
var $ = void 0;

function requestWebsite(siteData) {
  getAllIds(function (allIds) {
    requestMainSite(allIds, sessionIds, siteData);
  });
}

function getAllIds(callback) {
  idsRef.once('value', function (snapshot) {
    var filteredIds = [];

    if (snapshot.val() === null) {
      callback(filteredIds);
    } else {
      getIds(snapshot.val());
    }
  });

  function getIds(obj) {
    var ids = [];
    Object.keys(obj).map(function (track) {
      ids.push(obj[track].id);
    });

    callback(ids);
  }
}

function requestMainSite(allIds, sessionIds, siteData) {
  // skip url lookup if its not needed
  if (siteData.noSubSite) {
    getTrack(siteData.mainSite, allIds, sessionIds, siteData);
  } else {
    (0, _request2.default)({
      method: 'GET',
      url: siteData.mainSite
    }, function (err, response, body) {

      if (err) return console.error(err);

      $ = _cheerio2.default.load(body);

      // get list of urls
      $(siteData.mainSiteElements).each(function () {
        getTrack($(this).attr('href'), allIds, sessionIds, siteData);
      });
    });
  }
}

function getTrack(href, allIds, sessionIds, siteData) {
  (0, _request2.default)({ url: href }, function (err, response, body) {
    if (err) return console.error(err);
    $ = _cheerio2.default.load(body);
    $(siteData.subSiteElements).each(function () {
      var url = $('iframe', this).attr('src');
      if (url) {
        // filter out duplicate IDs
        var filteredIds = allIds.filter(function (item, pos, self) {
          return self.indexOf(item) == pos;
        });
        pushTrack(url, sessionIds, filteredIds, allIds);
      }
    });
  });
};

function pushTrack(url, sessionIds, filteredIds, allIds) {
  var idLength = void 0;
  var idType = void 0;
  var thisId = null;

  if (url.split(".")[1] === "soundcloud") {
    idLength = 9;
    idType = "sc";
    thisId = url.replace(/%2F/g, "/").substr(url.replace(/%2F/g, "/").lastIndexOf("tracks") + 7, idLength);
  } else if (url.split(".")[1] === "youtube") {
    idLength = 11;
    idType = "yt";
    thisId = url.substr(url.lastIndexOf("/") + 1, idLength);
  } else {
    console.log("Not soundcloud or youtube ID");
    return;
  }

  if (thisId != null && sessionIds.indexOf(thisId) === -1 && allIds.indexOf(thisId) === -1) {
    requestSoundCloudOrYouTube(thisId, idType);
    sessionIds.push(thisId);
  } else {
    console.log("ID already added");
  }

  setTimeout(function () {
    console.log("bye...");
    process.exit();
  }, 5500);
}

function requestSoundCloudOrYouTube(id, idType) {
  var url = idType === 'sc' ? 'https://api.soundcloud.com/tracks/' + id + '.json?client_id=b5e21578d92314bc753b90ea7c971c1e' : 'https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=AIzaSyDCoZw9dsD8pz3WxDOyQa_542XCDfpCwB4&part=snippet';
  (0, _request2.default)(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var track = idType === 'sc' ? formatSCData({}, id, data) : formatYTData({}, id, data);

      // Add data to firebase
      tracksRef.push({ track: track });
      idsRef.push({ id: track.id });
      console.log('Added Track ID: ', track.id, ' TYPE: ', track.kind);
    }
  });
}

function formatSCData(track, id, data) {
  track.id = id;
  track.tag_list = data.tag_list;
  track.permalink = data.permalink;
  track.genre = data.genre;
  track.title = data.title;
  track.artwork_url = data.artwork_url;
  track.artist = data.user.username;
  track.likes = 0;
  track.kind = 'sc';
  return track;
}

function formatYTData(track, id, data) {
  track.id = id;
  track.tag_list = data.items[0].snippet.tags || null;
  track.title = data.items[0].snippet.title;
  track.description = data.items[0].snippet.description;
  track.artwork_url = data.items[0].snippet.thumbnails.default.url;
  track.likes = 0;
  track.kind = 'yt';
  return track;
}
