import request from 'request'
import cheerio from 'cheerio'
import Firebase from 'firebase'
const ref = new Firebase('https://fresh-sauce.firebaseio.com/')
const idsRef = ref.child('ids')
const tracksRef = ref.child('tracks')
const genresRef = ref.child('genres')
let $, sessionIds = []

export function requestWebsite(siteData, allIds) {
  requestMainSite(allIds, sessionIds, siteData)
}

export var getAllTheIdsPromise = new Promise((resolve, reject)=>{
  idsRef.once('value', (snapshot) => {
    if(snapshot.val() === null) {
      console.warn('No IDs!')
    } else {
      const tracksObj = snapshot.val()
      const ids = Object.keys(tracksObj).map((track) => track)
      console.warn('---------- Got All Existing Ids ---------------')
      resolve(ids)
    }
  })
})

function asyncCall(url, returnType){
  return new Promise((resolve, reject)=>{
    request({url: url}, function(err, response, body) {
      if (err || response.statusCode !== 200) return console.error(err);
      if(returnType === 'json'){
        const data = JSON.parse(body)
        resolve(data)
      } else if(returnType === 'dom') {
        $ = cheerio.load(body);
        resolve($)
      }
    })
  })
}

function requestMainSite(allIds, sessionIds, siteData) {
  // skip url lookup if its not needed
  if(siteData.noSubSite) {
    getTrack(siteData.mainSite, allIds, sessionIds, siteData);
  } else {
    asyncCall(siteData.mainSite, 'dom').then(($) => {
      // get list of urls
      $(siteData.mainSiteElements).each(function() {
        let uri = $(this).attr('href')
        if(uri) {
          getTrack(uri, allIds, sessionIds, siteData);
        }
      })
    })
  }
}

function getTrack(href, allIds, sessionIds, siteData) {
  asyncCall(href, 'dom').then(($) => {
    if($(siteData.subSiteElements).length < 1) {
      console.warn('Can\'t find any "siteData.subSiteElements" elements')
    } else {
      $(siteData.subSiteElements).each(function() {
        const scUrl = $('iframe[src^="https://w.soundcloud.com/player"]', this).attr('src') || $('iframe[src^="http://w.soundcloud.com/player"]', this).attr('src');
        const ytUrl = $('iframe[src^="https://www.youtube.com/embed/"]', this).attr('src') || $('iframe[src^="http://www.youtube.com/embed/"]', this).attr('src') || $('iframe[src^="http://www.youtube-nocookie.com/embed/"]', this).attr('src');
        const vimeoUrl = $('iframe[src^="https://player.vimeo.com/video/"]', this).attr('src')
        const filteredIds = allIds.filter((item, pos, self) => {
          return self.indexOf(item) == pos
        })

        if (scUrl) {
          pushTrack(scUrl, sessionIds, filteredIds, allIds, siteData, href);
        } else if (ytUrl) {
          pushTrack(ytUrl, sessionIds, filteredIds, allIds, siteData, href);
        } else if (vimeoUrl) {
          console.warn("Vimeo URL")
        } else {
          console.warn("'scUrl', 'ytUrl', 'vimeo' are undefined!")
        }
      });
    }
  })
};

function pushTrack(url, sessionIds, filteredIds, allIds, siteData, href) {
  let idLength, idType, thisId = null
  if (url.split(".")[1] === "soundcloud") {
    idLength = 9
    idType = "sc"
    thisId = url.replace(/%2F/g,"/").substr(url.replace(/%2F/g,"/").lastIndexOf("tracks")+7, idLength)
  } else if (url.split(".")[1] === "youtube" || url.split(".")[1] === "youtube-nocookie") {
    idLength = 11
    idType = "yt"
    // set to null if not correct YT id
    thisId = url.split('/embed/')[1].substr(0,idLength) === 'videoseries' ? null : url.split('/embed/')[1].substr(0,idLength)
  } else {
    console.log(url, " Not soundcloud or youtube ID")
    return
  }

  if(thisId != null && sessionIds.indexOf(thisId) === -1 && allIds.indexOf(thisId) === -1) {
    requestSoundCloudOrYouTube(thisId, idType, siteData, href)
    sessionIds.push(thisId)
  } else {
    console.warn("ID already added")
  }
}

function requestSoundCloudOrYouTube(id, idType, siteData, href) {
  const url = idType === 'sc' ? 'https://api.soundcloud.com/tracks/'+id+'.json?client_id=b5e21578d92314bc753b90ea7c971c1e' : 'https://www.googleapis.com/youtube/v3/videos?id='+id+'&key=AIzaSyDCoZw9dsD8pz3WxDOyQa_542XCDfpCwB4&part=snippet,contentDetails,statistics,status'
  asyncCall(url, 'json').then((data)=>{
    if(data) { // Make sure data is not empty
      const trackBase = {id:id, genre:siteData.genre}
      const track = idType === 'sc' ? formatSCData(trackBase, data, href) : formatYTData(trackBase, data, href)

      // Add data to firebase
      // same code found in ./src/components/add-track
      tracksRef.child(track.id).setWithPriority(track, Date.now())
      idsRef.child(track.id).setWithPriority({id: track.id, displaying: true}, Date.now())
      console.log('Added Track ID: ', track.id, ' TYPE: ', track.kind, 'GENRE: ', track.genre)
    }
  })
}


function test(){

  tracksRef.on('value', function(snapshot) {
    snapshot.forEach((theItem)=>{

        const item = theItem.val();

        const track = item.kind === 'sc' ? formatSCData({id:item.id, genre:item.genre}, item) : formatYTData({id:item.id, genre:item.genre}, item)
        track.genre.forEach((genre)=>{
          // console.log(track)
          genresRef.child(genre).child(track.id).setWithPriority(track, track.timestamp)
        })




    })
  });



}
test()

function formatSCData(track, data, href) {
  if (data.title.indexOf("remix" || "Remix") > -1 && track.genre.indexOf("remix" || "Remix") < 0){ // add remix genre if title includes string 'remix' and not already remix genre
    console.log('--------------------------remix true')
    track.genre.push('remix')
  }

  track.artist = data.artist
  track.artwork_url = data.artwork_url || null
  track.artwork_url_midres = data.artwork_url_midres || null
  track.artwork_url_hires = data.artwork_url_hires || null
  track.duration = data.duration
  track.featured = false
  track.kind = 'sc'
  track.likes = 0
  track.permalink = data.permalink || null
  track.tag_list = data.tag_list
  track.timestamp = 0 - data.timestamp
  track.title = data.title
  track.href = data.href || null
  return track
}

function formatYTData(track, data, href) {
  // console.log('-------------------',data)
  if (data.genre.indexOf("remix" || "Remix") > -1 && track.genre.indexOf("remix" || "Remix") < 0){ // add remix genre if title includes string 'remix' and not already remix genre
    console.log('------------------------remix true')
    track.genre.push('remix')
  }

  track.artist = data.artist
  track.artwork_url = data.artwork_url || null
  track.artwork_url_midres = data.artwork_url_midres || null
  track.artwork_url_hires = data.artwork_url_hires || null
  track.duration = data.duration || null
  track.featured = false
  track.kind = 'yt'
  track.likes = 0
  track.permalink = data.permalink || null
  track.tag_list = data.tag_list
  track.timestamp = 0 - data.timestamp
  track.title = data.title
  track.user = data.user
  track.href = data.href || null
  return track
}
