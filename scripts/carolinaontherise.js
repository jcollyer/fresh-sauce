var request = require('request');
var cheerio = require('cheerio');
var pushTrack = require('./push-track-id')
var hrefs = [];

request({
    method: 'GET',
    url: 'http://carolinaontherise.com/'
}, function(err, response, body) {
     if (err) return console.error(err);
     $ = cheerio.load(body);
     // get list of urls
     $('.item-list').each(function() {
       var href = $('a', this).attr('href');
       hrefs.push(href);
    });
    //get sound cloud ids from tracks
    hrefs.forEach(function(href) {
      console.log("href " + href);
      getTrack(href);
    });
});

var getTrack = function(href){
  request({url: href}, function(err, response, body) {
    if (err) return console.error(err);
    $ = cheerio.load(body);
    $('.entry').each(function() {
      var url = $('p iframe', this).attr('src');
      pushTrack(url);
    });
  });
};
