'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTheIdsPromise = undefined;
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
var genresRef = ref.child('genres');
var $ = void 0,
    sessionIds = [];

function requestWebsite(siteData, allIds) {
  requestMainSite(allIds, sessionIds, siteData);
}

var getAllTheIdsPromise = exports.getAllTheIdsPromise = new Promise(function (resolve, reject) {
  idsRef.once('value', function (snapshot) {
    if (snapshot.val() === null) {
      console.warn('No IDs!');
    } else {
      var tracksObj = snapshot.val();
      var ids = Object.keys(tracksObj).map(function (track) {
        return track;
      });
      console.warn('---------- Got All Existing Ids ---------------');
      resolve(ids);
    }
  });
});

function asyncCall(url, returnType) {
  return new Promise(function (resolve, reject) {
    (0, _request2.default)({ url: url }, function (err, response, body) {
      if (err || response.statusCode !== 200) return console.error(err);
      if (returnType === 'json') {
        var data = JSON.parse(body);
        resolve(data);
      } else if (returnType === 'dom') {
        $ = _cheerio2.default.load(body);
        resolve($);
      }
    });
  });
}

function requestMainSite(allIds, sessionIds, siteData) {
  // skip url lookup if its not needed
  if (siteData.noSubSite) {
    getTrack(siteData.mainSite, allIds, sessionIds, siteData);
  } else {
    asyncCall(siteData.mainSite, 'dom').then(function ($) {
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
  asyncCall(href, 'dom').then(function ($) {
    if ($(siteData.subSiteElements).length < 1) {
      console.warn('Can\'t find any "siteData.subSiteElements" elements');
    } else {
      $(siteData.subSiteElements).each(function () {
        var scUrl = $('iframe[src^="https://w.soundcloud.com/player"]', this).attr('src') || $('iframe[src^="http://w.soundcloud.com/player"]', this).attr('src');
        var ytUrl = $('iframe[src^="https://www.youtube.com/embed/"]', this).attr('src') || $('iframe[src^="http://www.youtube.com/embed/"]', this).attr('src') || $('iframe[src^="http://www.youtube-nocookie.com/embed/"]', this).attr('src');
        var vimeoUrl = $('iframe[src^="https://player.vimeo.com/video/"]', this).attr('src');
        var filteredIds = allIds.filter(function (item, pos, self) {
          return self.indexOf(item) == pos;
        });

        if (scUrl) {
          pushTrack(scUrl, sessionIds, filteredIds, allIds, siteData, href);
        } else if (ytUrl) {
          pushTrack(ytUrl, sessionIds, filteredIds, allIds, siteData, href);
        } else if (vimeoUrl) {
          console.warn("Vimeo URL");
        } else {
          console.warn("'scUrl', 'ytUrl', 'vimeo' are undefined!");
        }
      });
    }
  });
};

function pushTrack(url, sessionIds, filteredIds, allIds, siteData, href) {
  var idLength = void 0,
      idType = void 0,
      thisId = null;
  if (url.split(".")[1] === "soundcloud") {
    idLength = 9;
    idType = "sc";
    thisId = url.replace(/%2F/g, "/").substr(url.replace(/%2F/g, "/").lastIndexOf("tracks") + 7, idLength);
  } else if (url.split(".")[1] === "youtube" || url.split(".")[1] === "youtube-nocookie") {
    idLength = 11;
    idType = "yt";
    // set to null if not correct YT id
    thisId = url.split('/embed/')[1].substr(0, idLength) === 'videoseries' ? null : url.split('/embed/')[1].substr(0, idLength);
  } else {
    console.log(url, " Not soundcloud or youtube ID");
    return;
  }

  if (thisId != null && sessionIds.indexOf(thisId) === -1 && allIds.indexOf(thisId) === -1) {
    requestSoundCloudOrYouTube(thisId, idType, siteData, href);
    sessionIds.push(thisId);
  } else {
    console.warn("ID already added");
  }
}

function requestSoundCloudOrYouTube(id, idType, siteData, href) {
  var url = idType === 'sc' ? 'https://api.soundcloud.com/tracks/' + id + '.json?client_id=b5e21578d92314bc753b90ea7c971c1e' : 'https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=AIzaSyDCoZw9dsD8pz3WxDOyQa_542XCDfpCwB4&part=snippet,contentDetails,statistics,status';
  asyncCall(url, 'json').then(function (data) {
    if (data) {
      // Make sure data is not empty
      var trackBase = { id: id, genre: siteData.genre };
      var track = idType === 'sc' ? formatSCData(trackBase, data, href) : formatYTData(trackBase, data, href);

      // Add data to firebase
      // same code found in ./src/components/add-track
      tracksRef.child(track.id).setWithPriority(track, Date.now());
      idsRef.child(track.id).setWithPriority({ id: track.id, displaying: true }, Date.now());
      console.log('Added Track ID: ', track.id, ' TYPE: ', track.kind, 'GENRE: ', track.genre);
    }
  });
}

function test() {

  tracksRef.on('value', function (snapshot) {
    snapshot.forEach(function (theItem) {

      var item = theItem.val();

      var track = item.kind === 'sc' ? formatSCData({ id: item.id, genre: item.genre }, item) : formatYTData({ id: item.id, genre: item.genre }, item);
      track.genre.forEach(function (genre) {
        // console.log(track)
        genresRef.child(genre).child(track.id).setWithPriority(track, track.timestamp);
      });
    });
  });
}
test();

function formatSCData(track, data, href) {
  if (data.title.indexOf("remix" || "Remix") > -1 && track.genre.indexOf("remix" || "Remix") < 0) {
    // add remix genre if title includes string 'remix' and not already remix genre
    console.log('--------------------------remix true');
    track.genre.push('remix');
  }

  track.artist = data.artist;
  track.artwork_url = data.artwork_url || null;
  track.artwork_url_midres = data.artwork_url_midres || null;
  track.artwork_url_hires = data.artwork_url_hires || null;
  track.duration = data.duration;
  track.featured = false;
  track.kind = 'sc';
  track.likes = 0;
  track.permalink = data.permalink || null;
  track.tag_list = data.tag_list;
  track.timestamp = 0 - data.timestamp;
  track.title = data.title;
  track.href = data.href || null;
  return track;
}

function formatYTData(track, data, href) {
  // console.log('-------------------',data)
  if (data.genre.indexOf("remix" || "Remix") > -1 && track.genre.indexOf("remix" || "Remix") < 0) {
    // add remix genre if title includes string 'remix' and not already remix genre
    console.log('------------------------remix true');
    track.genre.push('remix');
  }

  track.artist = data.artist;
  track.artwork_url = data.artwork_url || null;
  track.artwork_url_midres = data.artwork_url_midres || null;
  track.artwork_url_hires = data.artwork_url_hires || null;
  track.duration = data.duration || null;
  track.featured = false;
  track.kind = 'yt';
  track.likes = 0;
  track.permalink = data.permalink || null;
  track.tag_list = data.tag_list;
  track.timestamp = 0 - data.timestamp;
  track.title = data.title;
  track.user = data.user;
  track.href = data.href || null;
  return track;
}