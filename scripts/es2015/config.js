import request from 'request'
import cheerio from 'cheerio'
import Firebase from 'firebase'
const ref = new Firebase('https://fresh-sauce.firebaseio.com/')
const idsRef = ref.child('ids')
const tracksRef = ref.child('items')
const hrefs = []
let $

export function requestWebsite(siteData) {
  getAllIds((ids) => {
    requestMainSite(ids, siteData)
  })
}

function getAllIds(callback) {
  idsRef.once('value', (snapshot) => {
    let filteredIds = [];
    console.log("getAllIds " + snapshot.val());

    if(snapshot.val() === null) {
      callback(filteredIds)
    } else {
      getIds(snapshot.val())
    }
  })

  function getIds(obj) {
    const ids = []
    Object.keys(obj).map((track) => {
      ids.push(obj[track].id)
    })

    filterOutDuplicates(ids);
  }

  function filterOutDuplicates(ids) {
    const filteredIds = ids.filter((item, pos, self) => {
      return self.indexOf(item) == pos
    })

    callback(filteredIds)
  }
}

function requestMainSite(ids, siteData) {
  // skip url lookup if its not needed
  if(siteData.noSubSite) {
    getTrack(siteData.mainSite, ids, siteData);
  } else {
    request({
      method: 'GET',
      url: siteData.mainSite
    }, function (err, response, body) {

      if (err) return console.error(err);

      $ = cheerio.load(body);

      // get list of urls
      $(siteData.mainSiteElements).each(function() {
        var href = $(this).attr('href');
        // console.log(href);
        hrefs.push(href);
      })

      //get ids from soundcloud and youtube
      hrefs.map((href) => {
        getTrack(href, ids, siteData);
      });
    })
  }
}

function getTrack(href, ids, siteData) {
  request({url: href}, function(err, response, body) {
    if (err) return console.error(err);
    $ = cheerio.load(body);
    $(siteData.subSiteElements).each(function() {
      var url = $('iframe', this).attr('src');
      if (url) {
        pushTrack(url, ids);
      }
    });
  });
};

function pushTrack(url, ids) {
  let idLength
  if (url.split(".")[1] === "soundcloud") {
    idLength = 9
    // const thisId = url.substr(url.lastIndexOf("/")+1, idLength)
    const formattedUrl = url.replace(/%2F/g,"/")
    const thisId = formattedUrl.substr(formattedUrl.lastIndexOf("tracks")+7, idLength)
    // console.log(thisId)
    console.log("----------------- " + thisId);
    if(ids.indexOf(parseInt(thisId)) < 0) {
      requestSoundCloud(thisId)
    } else {
      console.log("ID already added")
    }
  } else if (url.split(".")[1] === "youtube") {
    idLength = 11
    const thisId = url.substr(url.lastIndexOf("/")+1, idLength)
    if(ids.indexOf(thisId) < 0) {
      requestYouTube(thisId)
    } else {
      console.log("ID already added")
    }
  } else {
    console.log("Not soundcloud or youtube ID")
    return
  }


  setTimeout(() => {
    console.log("bye...")
    process.exit()
  },5500)
}

export function requestSoundCloud(id) {
  let url = 'https://api.soundcloud.com/tracks/'+id+'.json?client_id=b5e21578d92314bc753b90ea7c971c1e'
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let formattedBody = JSON.parse(body)
      let track = {}
      track.id = formattedBody.id
      track.original_content_size = formattedBody.original_content_size
      track.tag_list = formattedBody.tag_list
      track.permalink = formattedBody.permalink
      track.genre = formattedBody.genre
      track.title = formattedBody.title
      track.artwork_url = formattedBody.artwork_url
      track.artist = formattedBody.user.username
      track.likes = 0
      track.kind = 'sc'
      console.log("-------------tag_list " + track.tag_list)

      // Add data to firebase
      tracksRef.push({track})
      idsRef.push({id: track.id})
      console.log('Added Track ID: ' + id + ' TYPE: sc')
    }
  })
}

export function requestYouTube(id) {
  let url = 'https://www.googleapis.com/youtube/v3/videos?id='+id+'&key=AIzaSyDCoZw9dsD8pz3WxDOyQa_542XCDfpCwB4&part=snippet'
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let formattedBody = JSON.parse(body)
      let track = {}
      track.id = id
      track.tag_list = formattedBody.items[0].snippet.tags
      track.title = formattedBody.items[0].snippet.title
      track.description = formattedBody.items[0].snippet.description
      track.artwork_url = formattedBody.items[0].snippet.thumbnails.default.url
      track.likes = 0
      track.kind = 'yt'

      // Add data to firebase
      tracksRef.push({track})
      idsRef.push({id: track.id})
      console.log('Added Track ID: ' + id + ' TYPE: yt')
    }
  })
}
