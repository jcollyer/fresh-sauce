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
      url: 'http://carolinaontherise.com/'
  }, function(err, response, body) {

       if (err) return console.error(err);

       $ = cheerio.load(body);

       // get list of urls
       $('.item-list').each(function() {
         var href = $('a', this).attr('href');
         hrefs.push(href);
      });

      //get ids from soundcloud and youtube
      hrefs.map((href) => {
        getTrack(href, ids);
      })
  })
}

var getTrack = function(href, ids){
  request({url: href}, function(err, response, body) {
    if (err) return console.error(err);
    $ = cheerio.load(body);
    $('.entry').each(function() {
      var url = $('p iframe', this).attr('src');
      pushTrack(url, ids);
    });
  });
};
