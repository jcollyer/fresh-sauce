var cheerio = require('cheerio');
var request = require('request');
var Firebase = require('firebase');
var ref = new Firebase('https://fresh-sauce.firebaseio.com');
var idsRef = ref.child("ids");
var hrefs = [];
// keep list of ids being added, to prevent duplicates
var ids = [], thisId;

// clear existing ids from firebase
idsRef.remove();

request({
    method: 'GET',
    url: 'http://carolinaontherise.com/page/3/'
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
      console.log("-------- " + href);
      getTrack(href);
    });
});

var getTrack = function(href){
  request({url: href}, function(err, response, body) {
    if (err) return console.error(err);
    $ = cheerio.load(body);
    $('.entry').each(function() {
      var url = $('p iframe', this).attr('src');
      sortUrl(url);
    });
  });
};

var sortUrl = function(url) {
  // if the id dose not exist yet in the ids array
  if(ids.indexOf(thisId) == -1){
    var idLength, thisType;

    if (url.split(".")[1] === "soundcloud") {
      idLength = 9;
      thisType = "sc";
    } else if(url.split(".")[1] === "youtube") {
      idLength = 11;
      thisType = "yt";
    } else {
      return;
    }

    var thisId = url.substr(url.lastIndexOf("/")+1, idLength);
    //push to local array
    ids.push(thisId);
    //push to firebase
    idsRef.push({id: thisId, type: thisType});
  }
  console.log("success! added id: " + thisId + " to type: " + thisType);
};

setTimeout(function() {
  console.log("bye...");
  process.exit();
},3500);
