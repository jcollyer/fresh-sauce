var request = require('request');
var cheerio = require('cheerio');
var Firebase = require('firebase');
var ref = new Firebase('https://fresh-sauce.firebaseio.com/');
var idsRef = ref.child("ids");
var ids = [];

var getTrack = function(href) {

  // first clear existing ids from firebase
  idsRef.remove();

  // get new ids
  request({url: href}, function(err, response, body) {
    if (err) return console.error(err);
    $ = cheerio.load(body);
    $('.entry-content').each(function() {
      var url = $('iframe', this).attr('src');
      if (url.split(".")[1] === "soundcloud") {
        // get soundcloud id
        var id = url.substr(url.lastIndexOf("/")+1, 9);
        // to prevent duplicates
        if(ids.indexOf(id) == -1){
          ids.push(id);
          // push to firebase
          idsRef.push({id: id, type: 'sc'});
        }
        console.log("success! added id: " + id);
      }
    });
  });
};

module.exports = getTrack;
