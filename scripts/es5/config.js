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
