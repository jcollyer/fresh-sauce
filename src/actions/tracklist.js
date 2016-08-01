import C from '../constants'
import Firebase from 'firebase'
const tracksRef = new Firebase(C.FIREBASE).child('tracks')

function loadTracks(startAt){
  console.log(startAt)
  const tracksArr = []

  tracksRef.orderByChild('timestamp').startAt(startAt).limitToFirst(15).on('value', (snapshot) => {
    snapshot.forEach((track) => {

      let sanitizedTrack = sanitizeTrack(track)
      tracksArr.push(sanitizedTrack)
    })
  })
  return tracksArr
}

function sanitizeTrack(track) {
  let sanitizedTrack = {}
  if(track.val().kind === 'sc') {
    sanitizedTrack = {
      id: track.val().id,
      artwork_url: track.val().artwork_url,
      artwork_url_hires: track.val().artwork_url_hires,
      duration: track.val().duration,
      featured: track.val().featured,
      genre: track.val().genre,
      kind: track.val().kind,
      permalink: track.val().permalink,
      permalink_url: track.val().permalink_url,
      tag_list: track.val().tag_list,
      timestamp: track.val().timestamp,
      title: track.val().title,
      artist: track.val().artist,
      scURL: 'https://soundcloud.com/'+ track.val().artist.replace(/\s/g, '') + '/' + track.val().permalink,
      linkTitle: 'SoundCloud ',
      linkIcon: 'icon icon-soundcloud '
    }
  } else if (track.val().kind === 'yt') {
    sanitizedTrack = {
      id: track.val().id,
      artwork_url: track.val().artwork_url,
      artwork_url_hires: track.val().artwork_url_hires,
      duration: track.val().duration,
      featured: track.val().featured,
      genre: track.val().genre,
      kind: track.val().kind,
      permalink: track.val().permalink,
      permalink_url: track.val().permalink_url,
      tag_list: track.val().tag_list,
      timestamp: track.val().timestamp,
      title: track.val().title,
      artist: track.val().tag_list[0],
      scURL: 'https://www.youtube.com/watch?v='+track.val().id,
      linkIcon: 'icon icon-youtube',
      linkTitle: 'YouTube'
    }
  }
  return sanitizedTrack
}

export function startListeningToTracks() {
  return function(dispatch, getState){
    let tracksOnloadArr = []
    let firstTimestamp

    tracksRef.orderByChild('timestamp').on('value', (snapshot) => {

      snapshot.forEach((track) => {
        tracksOnloadArr.push(track.val())
      })
      firstTimestamp = tracksOnloadArr[0].timestamp
      tracksOnloadArr = loadTracks(firstTimestamp)

      dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: tracksOnloadArr, hasreceiveddata: true })
      // set first track in tracklist
      dispatch({ type: C.SET_TRACK, track: tracksOnloadArr[0], trackPlaying: true })
    })
  }
}

export function nextPage() {
  return function(dispatch, getState){
    let lastTrackTimestamp = getState().tracklist.tracks.splice(-1)[0].timestamp
    let tracksArr = loadTracks(lastTrackTimestamp)

    dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: tracksArr, hasreceiveddata: true })
  }
}

// for /tracks/<trackID> urls
export function setTrackDetail(id) {
  return function(dispatch, getState){
    let trackDetail = {}
    let sanitizedTrack = {}
    tracksRef.orderByChild('id').equalTo(id).on("value", function(snapshot) {
      let sanitizedTrack = sanitizeTrack(snapshot)
      dispatch({ type: C.SET_TRACK_DETAIL, sanitizedTrack })
    })
  }
}
