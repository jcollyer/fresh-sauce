import React, { Component } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'
import Firebase from 'firebase'
const ref = new Firebase('https://fresh-sauce.firebaseio.com/')
const idsRef = ref.child('ids')
const tracksRef = ref.child('items')

class AddTrack extends Component {

  requestSoundCloudOrYouTube(id, idType, featured) {
		let that = this
    const url = idType === 'sc' ? 'https://api.soundcloud.com/tracks/'+id+'.json?client_id=b5e21578d92314bc753b90ea7c971c1e' : 'https://www.googleapis.com/youtube/v3/videos?id='+id+'&key=AIzaSyDCoZw9dsD8pz3WxDOyQa_542XCDfpCwB4&part=snippet,contentDetails,statistics,status'
    request
      .get(url)
      .end(function(error, response){
        const data = response.body
        const track = idType === 'sc' ? that.formatSCData({id:id}, data, featured) : that.formatYTData({id:id}, data, featured)

        // Add data to firebase
        tracksRef.push({track})
        idsRef.push({id: track.id})
        console.log('Added Track ID: ', track.id, ' TYPE: ', track.kind)
      });
  }
  formatSCData(track, data, featured) {
    track.tag_list = data.tag_list
    track.permalink = data.permalink
    track.genre = data.genre
    track.title = data.title
    track.duration = data.duration
    track.artwork_url = data.artwork_url
    track.permalink_url = data.permalink_url
    track.artist = data.user.username
    track.likes = 0
    track.featured = featured
    track.kind = 'sc'
    return track
  }
  formatYTData(track, data, featured) {
    track.tag_list = data.items[0].snippet.tags || null
    track.title = data.items[0].snippet.title
    track.description = data.items[0].snippet.description
    track.duration = data.items[0].contentDetails.duration;
    track.artwork_url = data.items[0].snippet.thumbnails.default.url
    track.likes = 0
    track.featured = featured
    track.kind = 'yt'
    return track
  }
  handleSubmit(event) {
    event.preventDefault()
    let id = event.target.children[0].value
    let featured = event.target.children[1].checked
    let type = id.length === 9 ? 'sc' : 'yt'
    console.log(id, type, featured)

    this.requestSoundCloudOrYouTube(id, type, featured)
  }
  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <input type='text' placeholder='track id' />
        <input type='checkbox' value='featured' />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

export default connect()(AddTrack)
