var request = require('request');
var cheerio = require('cheerio');
var pushTrack = require('./push-track-id')
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

var getTrack = function(href) {
  // get new ids
  request({url: href}, function(err, response, body) {
    if (err) return console.error(err);
    $ = cheerio.load(body);
    $('.entry-content').each(function() {
      var url = $('iframe', this).attr('src');
      pushTrack(url);
    });
  });
};
