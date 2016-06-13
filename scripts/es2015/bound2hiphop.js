import request from 'request'
import cheerio from 'cheerio'
import { getAllIds, pushTrack, requestSoundCloud, requestYouTube } from './config'
const hrefs = []
let $

getAllIds((ids) => {
  requestMainSite(ids)
})

function requestMainSite(ids) {
  request({
    method: 'GET',
    url: 'https://bound2hiphop.com/category/singles/'
  }, function (err, response, body) {

    if (err) return console.error(err);

    $ = cheerio.load(body);

    // get list of urls
    $('.small-12.medium-4.columns').each(function() {
      var href = $('.post-gallery a', this).attr('href');
      hrefs.push(href);
    })

    //get ids from soundcloud and youtube
    hrefs.map((href) => {
      getTrack(href, ids);
    });
  })
}

var getTrack = function(href, ids) {
  request({url: href}, function(err, response, body) {
    if (err) return console.error(err);
    $ = cheerio.load(body);
    $('.entry-content').each(function() {
      var url = $('iframe', this).attr('src');
      pushTrack(url, ids);
    });
  });
};

// requestMainSite(null);
