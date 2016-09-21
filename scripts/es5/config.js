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
var tracksRef = ref.child('tracks');
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
        var uri = $(this).attr('href');
        if (uri) {
          getTrack(uri, allIds, sessionIds, siteData);
        }
      });
    });
  }
}

function getTrack(href, allIds, sessionIds, siteData) {
  (0, _request2.default)({ url: href }, function (err, response, body) {
    if (err) return console.error(err);
    $ = _cheerio2.default.load(body);

    if ($(siteData.subSiteElements).length < 1) {
      console.warn('Can\'t find any "siteData.subSiteElements" elements');
    } else {
      $(siteData.subSiteElements).each(function () {
        var scUrl = $('iframe[src^="https://w.soundcloud.com/player/?"]', this).attr('src');
        var ytUrl = $('iframe[src^="https://www.youtube.com/embed/"]', this).attr('src');
        var filteredIds = allIds.filter(function (item, pos, self) {
          return self.indexOf(item) == pos;
        });

        if (scUrl) {
          pushTrack(scUrl, sessionIds, filteredIds, allIds, siteData);
        } else if (ytUrl) {
          pushTrack(ytUrl, sessionIds, filteredIds, allIds, siteData);
        } else {
          console.warn('scUrl is undefined!');
        }
      });
    }
  });
};

function pushTrack(url, sessionIds, filteredIds, allIds, siteData) {
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
    thisId = url.split('/')[4].substr(0, idLength);
  } else {
    console.log(url, " Not soundcloud or youtube ID");
    return;
  }

  if (thisId != null && sessionIds.indexOf(thisId) === -1 && allIds.indexOf(thisId) === -1) {
    requestSoundCloudOrYouTube(thisId, idType, siteData);
    sessionIds.push(thisId);
  } else {
    console.warn("ID already added");
  }

  // exit()
}

function requestSoundCloudOrYouTube(id, idType, siteData) {
  var url = idType === 'sc' ? 'https://api.soundcloud.com/tracks/' + id + '.json?client_id=b5e21578d92314bc753b90ea7c971c1e' : 'https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=AIzaSyDCoZw9dsD8pz3WxDOyQa_542XCDfpCwB4&part=snippet,contentDetails,statistics,status';
  (0, _request2.default)(url, function (error, response, body) {
    if (error) {
      console.log('Error running requestSoundCloudOrYouTube()', error);
    }
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var genre = siteData.genre;

      if (data) {
        // Make sure data is not empty
        var track = idType === 'sc' ? formatSCData({ id: id }, data, genre) : formatYTData({ id: id }, data, genre);

        // Add data to firebase
        // same code found in ./src/components/add-track
        tracksRef.child(track.id).setWithPriority(track, Date.now());
        idsRef.child(track.id).setWithPriority({ id: track.id, displaying: true }, Date.now());
        console.log('Added Track ID: ', track.id, ' TYPE: ', track.kind, 'GENRE: ', genre);
      }
    }
  });
}
// same code found in ./src/components/add-track
function formatSCData(track, data, genre) {
  track.artist = data.user.username;
  track.artwork_url = data.artwork_url;
  track.artwork_url_midres = data.artwork_url ? data.artwork_url.replace('large', 't200x200') : '';
  track.artwork_url_hires = data.artwork_url ? data.artwork_url.replace('large', 't500x500') : '';
  track.duration = data.duration;
  track.featured = false;
  track.genre = genre;
  track.kind = 'sc';
  track.likes = 0;
  track.permalink = data.permalink_url;
  track.tag_list = data.tag_list;
  track.timestamp = 0 - Date.now();
  track.title = data.title;
  return track;
}

// same code found in ./src/components/add-track
function formatYTData(track, data, genre) {
  track.artist = data.items[0].snippet.tags ? data.items[0].snippet.tags[0] : '';
  track.artwork_url = data.items[0].snippet.thumbnails.default.url;
  track.artwork_url_midres = data.items[0].snippet.thumbnails.medium.url;
  track.artwork_url_hires = data.items[0].snippet.thumbnails.standard ? data.items[0].snippet.thumbnails.standard.url : data.items[0].snippet.thumbnails.high.url;
  track.duration = data.items[0].contentDetails.duration;
  track.featured = false;
  track.genre = genre;
  track.kind = 'yt';
  track.likes = 0;
  track.permalink = 'https://www.youtube.com/watch?v=' + data.items[0].id, track.tag_list = data.items[0].snippet.tags || '';
  track.timestamp = 0 - Date.now();
  track.title = data.items[0].snippet.title;
  track.user = data.items[0].snippet.channelId;
  return track;
}

function exit() {
  setTimeout(function () {
    console.log("bye...");
    process.exit();
  }, 5500);
}
