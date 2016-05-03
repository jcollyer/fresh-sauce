var request = require('request');
var Firebase = require('firebase');
var tracksRef = new Firebase('https://fresh-sauce.firebaseio.com/items');
var idsRef = new Firebase('https://fresh-sauce.firebaseio.com/ids');

// Attach an asynchronous callback to read the data at our posts reference
idsRef.on("value", function(snapshot) {
  var obj = snapshot.val();

  for(track in obj) {
    var id = obj[track].id;
    var type = obj[track].type;
    console.log(id, type);
    if(type == "sc") {
      requestSoundCloud(id);
    } else if(type == "yt") {
      requestYouTube(id);
    }

    console.log("success! added tracks: " + JSON.stringify(track));
  }
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

var requestSoundCloud = function(id) {
  var url = 'https://api.soundcloud.com/tracks/'+id+'.json?client_id=b5e21578d92314bc753b90ea7c971c1e';
  request(url, function (error, response, body) {
    var formattedBody = JSON.parse(body);
    if (!error && response.statusCode == 200) {
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
      tracksRef.push({track});
    }
  })
};

var requestYouTube = function(id) {
  var url = 'https://www.googleapis.com/youtube/v3/videos?id='+id+'&key=AIzaSyDCoZw9dsD8pz3WxDOyQa_542XCDfpCwB4&part=snippet';
  request(url, function (error, response, body) {
    var formattedBody = JSON.parse(body);
    if (!error && response.statusCode == 200) {
      var track = {};
      track.id = id;
      track.tag_list = formattedBody.items[0].snippet.tags;
      track.title = formattedBody.items[0].snippet.title;
      track.description = formattedBody.items[0].snippet.description;
      track.artwork_url = formattedBody.items[0].snippet.thumbnails.default.url;
      track.likes = 0;
      track.kind = 'yt';
      // Add data to firebase
      tracksRef.push({track});
    }
  })
};

setTimeout(function() {
  console.log("bye...");
  process.exit();
},3500);
