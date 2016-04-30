var fs = require('fs');
var request = require('request');
var Firebase = require('firebase');
var ref = new Firebase('https://fresh-sauce.firebaseio.com');
var usersRef = ref.child("items");

var idsFile = './scrapes/ids.js';

fs.readFile(idsFile, 'utf8', function(err, data) {
  console.log(JSON.stringify(data));
  formattedData = data.split(",");
  // loop through each id
  formattedData.forEach(function(id){
      var url = 'https://api.soundcloud.com/tracks/'+id+'.json?client_id=b5e21578d92314bc753b90ea7c971c1e';

      request(url, function (error, response, body) {
        var formattedBody = JSON.parse(body);
        // console.log("body: " + body);
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

          // Add data to firebase
          usersRef.push({track});

          console.log("success! added tracks: " + JSON.stringify(track));
        }
      })
  });
});

setTimeout(function() {
  console.log("bye...");
  process.exit();
},3500);
