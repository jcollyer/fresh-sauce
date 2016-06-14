import request from 'request'
import cheerio from 'cheerio'
import { getAllIds, pushTrack } from './config'
const hrefs = []
let $

export function anonymouslygifted() {
  getAllIds((ids) => {
    requestMainSite(ids)
  })

  function requestMainSite(ids) {
    request({
      method: 'GET',
      url: 'http://anonymouslygifted.com/'
    }, function (err, response, body) {

      if (err) return console.error(err);

      $ = cheerio.load(body);

      // get list of urls
      $('.postMain .post .more-link').each(function() {
        var href = $(this).attr('href');
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
      $('.postMain .post').each(function() {
        var url = $('iframe', this).attr('src');
        if (url) {
          pushTrack(url, ids);
        }
      });
    });
  };
}
