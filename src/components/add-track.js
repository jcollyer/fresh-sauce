import React, { Component } from 'react'
import request from 'superagent'
import Firebase from 'firebase'
const ref = new Firebase('https://fresh-sauce.firebaseio.com/')
const idsRef = ref.child('ids')
const tracksRef = ref.child('tracks')

class AddTrack extends Component {
  requestSoundCloudOrYouTube(id, idType, featured, genre) {
    let that = this
    genre = genre.split(',')
    const url = idType === 'sc' ? 'https://api.soundcloud.com/tracks/'+id+'.json?client_id=b5e21578d92314bc753b90ea7c971c1e' : 'https://www.googleapis.com/youtube/v3/videos?id='+id+'&key=AIzaSyDCoZw9dsD8pz3WxDOyQa_542XCDfpCwB4&part=snippet,contentDetails,statistics,status'
    request
      .get(url)
      .end(function(error, response){
        const data = response.body
        const track = idType === 'sc' ? that.formatSCData({id:id}, data, featured, genre) : that.formatYTData({id:id}, data, featured, genre)
        // Add data to firebase
        // same code found in ./scripts/es2015/config.js
        tracksRef.child(track.id).setWithPriority(track, Date.now())
        idsRef.child(track.id).setWithPriority({id: track.id, displaying: true}, Date.now())
        console.log('Added Track ID: ', track.id, ' TYPE: ', track.kind)
      });
  }
  // same code found in ./scripts/es2015/config.js
  formatSCData(track, data, featured, genre) {
    track.artist = data.user.username
    track.artwork_url = data.artwork_url
    track.artwork_url_midres = data.artwork_url ? data.artwork_url.replace('large','t200x200') : ''
    track.artwork_url_hires = data.artwork_url ? data.artwork_url.replace('large','t500x500') : ''
    track.duration = data.duration
    track.featured = featured
    track.genre = genre
    track.kind = 'sc'
    track.likes = 0
    track.permalink = data.permalink_url
    track.tag_list = data.tag_list
    track.timestamp = 0 - Date.now()
    track.title = data.title
    return track
  }
  // same code found in ./scripts/es2015/config.js
  formatYTData(track, data, featured, genre) {
    track.artist = data.items[0].snippet.tags ? data.items[0].snippet.tags[0] : ''
    track.artwork_url = data.items[0].snippet.thumbnails.default.url
    track.artwork_url_midres = data.items[0].snippet.thumbnails.medium.url
    track.artwork_url_hires = data.items[0].snippet.thumbnails.standard.url
    track.duration = data.items[0].contentDetails.duration;
    track.featured = false
    track.genre = genre
    track.kind = 'yt'
    track.likes = 0
    track.permalink = 'https://www.youtube.com/watch?v='+data.items[0].id,
    track.tag_list = data.items[0].snippet.tags || ''
    track.timestamp = 0 - Date.now()
    track.title = data.items[0].snippet.title
    track.user = data.items[0].snippet.channelId
    return track
  }
  handleSubmit(event) {
    event.preventDefault()
    let id = event.target.children[0].value
    let genre = event.target.children[1].value
    let featured = event.target.children[2].checked
    let type = id.length === 9 ? 'sc' : 'yt'
    console.log(id, type, featured)
    this.requestSoundCloudOrYouTube(id, type, featured, genre)
  }
  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <input type='text' placeholder='track id' />
        <input type='text' placeholder='genre' />
        <input type='checkbox' value='featured' />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

export default AddTrack
