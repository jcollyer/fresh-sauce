var request = require('request');
var cheerio = require('cheerio');
var getTrack = require('./get-track.js');
var hrefs = [];

request({
    method: 'GET',
    url: 'https://bound2hiphop.com/category/singles/'
}, function(err, response, body) {
     if (err) return console.error(err);
     $ = cheerio.load(body);
     // get list of urls
     $('.small-12.medium-4.columns').each(function() {
       var href = $('a', this).attr('href');
       hrefs.push(href);
    });
    //get soundcloud ids from tracks
    hrefs.forEach(function(href) {
      getTrack(href);
      console.log("hrefs " + href)
    });
});



setTimeout(function() {
  console.log("bye...");
  process.exit();
},3500);
