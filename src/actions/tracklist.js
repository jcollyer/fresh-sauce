import C from '../constants'
import Firebase from 'firebase'
const tracksRef = new Firebase(C.FIREBASE).child('tracks')
import { YTDurationToSeconds } from '../utils'

function loadTracks(startAt, genre){
  console.log('startAt: ', startAt, 'genre: ', genre)
  let tracksArr = []

  tracksRef.orderByChild('timestamp').startAt(startAt).limitToFirst(15).on('value', (snapshot) => {
    snapshot.forEach((track) => {
      let sanitizedTrack = sanitizeTrack(track.val())
      if (genre === '') { // if no genre set, push all tracks
        tracksArr.push(sanitizedTrack)
      } else if (sanitizedTrack.genre.indexOf(genre) > -1) { // if genre IS set, push only tracks with correct genre
        tracksArr.push(sanitizedTrack)
      }
    })
  })
  return tracksArr
}

function sanitizeTrack(track) {
  let sanitizedTrack = {}
  if(track.kind === 'sc') {
    sanitizedTrack = {
      id: track.id,
      artwork_url: track.artwork_url,
      artwork_url_midres: track.artwork_url_midres,
      artwork_url_hires: track.artwork_url_hires,
      duration: track.duration,
      featured: track.featured,
      genre: track.genre,
      kind: track.kind,
      tag_list: track.tag_list,
      timestamp: track.timestamp,
      title: track.title,
      artist: track.artist,
      permalink: track.permalink,
      linkTitle: 'SoundCloud ',
      linkIcon: 'icon icon-soundcloud '
    }
  } else if (track.kind === 'yt') {
    sanitizedTrack = {
      id: track.id,
      artwork_url: track.artwork_url,
      artwork_url_midres: track.artwork_url_midres,
      artwork_url_hires: track.artwork_url_hires,
      duration: YTDurationToSeconds(track.duration),
      featured: track.featured,
      genre: track.genre,
      kind: track.kind,
      tag_list: track.tag_list,
      timestamp: track.timestamp,
      title: track.title,
      artist: track.artist,
      permalink: track.permalink,
      linkIcon: 'icon icon-youtube',
      linkTitle: 'YouTube'
    }
  }
  return sanitizedTrack
}

export function startListeningToTracks(genre) {
  return function(dispatch, getState){
    let tracksOnloadArr = []
    let firstTimestamp
    let thisGenre = genre === '' ? genre : getState().tracklist.genre

    tracksRef.orderByChild('timestamp').on('value', (snapshot) => { // get snapshot to determine timestamp of first track
      snapshot.forEach((track) => {
        tracksOnloadArr.push(track.val())
      })
      firstTimestamp = tracksOnloadArr[0].timestamp
      tracksOnloadArr = loadTracks(firstTimestamp, thisGenre)

      dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: tracksOnloadArr, hasreceiveddata: true, shuffle: false, replace: true, genre: genre })
      // set first track in tracklist
      dispatch({ type: C.SET_TRACK, track: tracksOnloadArr[0], trackPlaying: false })
    })
  }
}

export function nextPage() {
  return function(dispatch, getState){
    let lastTrackTimestamp = getState().tracklist.tracks.splice(-1)[0].timestamp
    let genre = getState().tracklist.genre
    let tracksArr = loadTracks(lastTrackTimestamp, genre)

    dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: tracksArr, hasreceiveddata: true, shuffle: getState().tracklist.shuffle, replace: false, genre: getState().tracklist.genre })
  }
}

export function toggleShuffleTracks() {
  return function(dispatch, getState) {
    if (getState().tracklist.shuffle){
      dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: getState().tracklist.tracks, hasreceiveddata: true, shuffle: false, replace: false, genre: getState().tracklist.genre })
    } else {
      dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: getState().tracklist.tracks, hasreceiveddata: true, shuffle: true, replace: false, genre: getState().tracklist.genre })
    }
  }
}


export function loadTracksByGenre(genre) {
  return function(dispatch, getState){
    let tracksOnloadArr = []
    let firstTimestamp

    tracksRef.orderByChild('timestamp').on('value', (snapshot) => { // get snapshot to determine timestamp of first track
      snapshot.forEach((track) => {
        tracksOnloadArr.push(track.val())
      })
      firstTimestamp = tracksOnloadArr[0].timestamp
      tracksOnloadArr = loadTracks(firstTimestamp, genre)

      dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: tracksOnloadArr, hasreceiveddata: true, shuffle: false, replace: true, genre: genre })
      // set first track in tracklist
      dispatch({ type: C.SET_TRACK, track: tracksOnloadArr[0], trackPlaying: false })
    })
  }
}

// for /tracks/<trackID> urls
export function setTrackDetailPage(id) {
  return function(dispatch, getState){
    let trackDetail = {}
    let sanitizedTrack = {}
    tracksRef.orderByChild('id').equalTo(id).on("value", function(snapshot) {
      let track = snapshot.val()[Object.keys(snapshot.val())]
      let sanitizedTrack = sanitizeTrack(track)
      dispatch({ type: C.SET_TRACK_DETAIL_PAGE, trackDetail: sanitizedTrack, trackPlaying: false })
    })
  }
}
