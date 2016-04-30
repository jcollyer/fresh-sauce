var cheerio = require('cheerio');
var request = require('request');
var Firebase = require('firebase');
var ref = new Firebase('https://fresh-sauce.firebaseio.com');
var idsRef = ref.child("ids");
var hrefs = [];
var ids = [];

request({
    method: 'GET',
    url: 'https://bound2hiphop.com/category/singles/'
}, function(err, response, body) {
     if (err) return console.error(err);
     $ = cheerio.load(body);
     // get list of urls
     $('.post-gallery').each(function() {
       var href = $('a', this).attr('href');
       hrefs.push(href);
    });
    //get sound cloud ids from tracks
    hrefs.forEach(function(href) {
      getTrack(href);
    });
});

var getTrack = function(href){
  request({url: href}, function(err, response, body) {
    if (err) return console.error(err);
    $ = cheerio.load(body);
    $('.entry-content').each(function() {
      var url = $('iframe', this).attr('src');
      if (url.split(".")[1] === "soundcloud") {
        // get soundcloud id
        var id = url.substr(url.lastIndexOf("/")+1, 9);
        // push to firebase
        idsRef.push({id});

        console.log("success! added id: " + id);
      }
    });
  });
};

setTimeout(function() {
  console.log("bye...");
  process.exit();
},3500);
