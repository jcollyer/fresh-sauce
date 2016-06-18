import request from 'request'
import cheerio from 'cheerio'
import Firebase from 'firebase'
const ref = new Firebase('https://fresh-sauce.firebaseio.com/')
const idsRef = ref.child('ids')
const tracksRef = ref.child('items')
const sessionIds = []
let $

export function requestWebsite(siteData) {
  getAllIds((allIds) => {
    requestMainSite(allIds, sessionIds, siteData)
  })
}

function getAllIds(callback) {
  idsRef.once('value', (snapshot) => {
    let filteredIds = [];

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

    callback(ids)
  }

}

function requestMainSite(allIds, sessionIds, siteData) {
  // skip url lookup if its not needed
  if(siteData.noSubSite) {
    getTrack(siteData.mainSite, allIds, sessionIds, siteData);
  } else {
    request({
      method: 'GET',
      url: siteData.mainSite
    }, function (err, response, body) {

      if (err) return console.error(err);

      $ = cheerio.load(body);

      // get list of urls
      $(siteData.mainSiteElements).each(function() {
        getTrack($(this).attr('href'), allIds, sessionIds, siteData);
      })
    })
  }
}

function getTrack(href, allIds, sessionIds, siteData) {
  request({url: href}, function(err, response, body) {
    if (err) return console.error(err);
    $ = cheerio.load(body);
    $(siteData.subSiteElements).each(function() {
      const url = $('iframe', this).attr('src');
      if (url) {
        // filter out duplicate IDs
        const filteredIds = allIds.filter((item, pos, self) => {
          return self.indexOf(item) == pos
        })
        pushTrack(url, sessionIds, filteredIds, allIds);
      }
    });
  });
};

function pushTrack(url, sessionIds, filteredIds, allIds) {
  let idLength
  let idType
  let thisId = null

  if (url.split(".")[1] === "soundcloud") {
    idLength = 9
    idType = "sc"
    thisId = url.replace(/%2F/g,"/").substr(url.replace(/%2F/g,"/").lastIndexOf("tracks")+7, idLength)
  } else if (url.split(".")[1] === "youtube") {
    idLength = 11
    idType = "yt"
    thisId = url.substr(url.lastIndexOf("/")+1, idLength)
  } else {
    console.log("Not soundcloud or youtube ID")
    return
  }

  if(thisId != null && sessionIds.indexOf(thisId) === -1 && allIds.indexOf(thisId) === -1) {
    requestSoundCloudOrYouTube(thisId, idType)
    sessionIds.push(thisId)
  } else {
    console.log("ID already added")
  }

  setTimeout(() => {
    console.log("bye...")
    process.exit()
  },5500)
}

function requestSoundCloudOrYouTube(id, idType) {
  const url = idType === 'sc' ? 'https://api.soundcloud.com/tracks/'+id+'.json?client_id=b5e21578d92314bc753b90ea7c971c1e' : 'https://www.googleapis.com/youtube/v3/videos?id='+id+'&key=AIzaSyDCoZw9dsD8pz3WxDOyQa_542XCDfpCwB4&part=snippet'
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body)
      const track = idType === 'sc' ? formatSCData({}, id, data) : formatYTData({}, id, data)

      // Add data to firebase
      tracksRef.push({track})
      idsRef.push({id: track.id})
      console.log('Added Track ID: ', track.id, ' TYPE: ', track.kind)
    }
  })
}

function formatSCData(track, id, data) {
  track.id = id
  track.tag_list = data.tag_list
  track.permalink = data.permalink
  track.genre = data.genre
  track.title = data.title
  track.artwork_url = data.artwork_url
  track.artist = data.user.username
  track.likes = 0
  track.kind = 'sc'
  return track
}

function formatYTData(track, id, data) {
  track.id = id
  track.tag_list = data.items[0].snippet.tags || null
  track.title = data.items[0].snippet.title
  track.description = data.items[0].snippet.description
  track.artwork_url = data.items[0].snippet.thumbnails.default.url
  track.likes = 0
  track.kind = 'yt'
  return track
}
