import C from '../constants'
import Firebase from 'firebase'
const tracksRef = new Firebase(C.FIREBASE).child('tracks')
import { YTDurationToSeconds } from '../utils'

function recursivelyGetTracks(startAt, genre) {
  let tracksArr = []
  let sanitizedTrack = {}
  tracksRef.orderByChild('timestamp').startAt(startAt).limitToFirst(30).on('value', (snapshot) => {
    snapshot.forEach((track) => {
      sanitizedTrack = sanitizeTrack(track.val())
      if (sanitizedTrack.genre.indexOf(genre) > -1) { // if genre IS set, push only tracks with correct genre
        tracksArr.push(sanitizedTrack)
      }
    })
  })

  if(tracksArr === 0) {
    const startAt = sanitizedTrack.timestamp
    recursivelyGetTracks(startAt, genre)
  } else {
    return tracksArr
  }
}

function loadTracks(startAt, genre) {
  console.log('startAt: ', startAt, 'genre: ', genre)
  let tracksArr = []
  let sanitizedTrack
  let allTracks = []

  tracksRef.orderByChild('timestamp').startAt(startAt).limitToFirst(30).on('value', (snapshot) => {
    snapshot.forEach((track) => {
      sanitizedTrack = sanitizeTrack(track.val())
      allTracks.push(sanitizedTrack)
      if (genre === '') { // if no genre set, push all tracks
        tracksArr.push(sanitizedTrack)
      } else if (sanitizedTrack.genre.indexOf(genre) > -1) { // if genre IS set, push only tracks with correct genre
        tracksArr.push(sanitizedTrack)
      }
    })
  })

  if (genre != '' && tracksArr.length === 0) { // if had a genre but can't find any matching tracks in the 30 track limit
    const startAt = sanitizedTrack.timestamp
    tracksArr = recursivelyGetTracks(startAt, genre)
  }

  return { tracksArr: tracksArr,  allTracks: allTracks }
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
    let loadTracksObj
    tracksRef.orderByChild('timestamp').on('value', (snapshot) => { // get snapshot to determine timestamp of first track
      snapshot.forEach((track) => {
        tracksOnloadArr.push(track.val())
      })
      firstTimestamp = tracksOnloadArr[0].timestamp
      loadTracksObj = loadTracks(firstTimestamp, thisGenre)

      dispatch({ type: C.RECEIVE_TRACKS_DATA, allTracks: loadTracksObj.allTracks, tracks: loadTracksObj.tracksArr, hasreceiveddata: true, shuffle: false, replace: true, genre: genre })
      // set first track in tracklist
      dispatch({ type: C.SET_TRACK, track: tracksOnloadArr[0], trackPlaying: false })
    })
  }
}

export function nextPage() {
  return function(dispatch, getState){
    let lastTrackTimestamp = getState().tracklist.allTracks[getState().tracklist.allTracks.length-1].timestamp
    let genre = getState().tracklist.genre || ''
    let loadTracksObj = loadTracks(lastTrackTimestamp, genre)

    dispatch({ type: C.RECEIVE_TRACKS_DATA, allTracks: loadTracksObj.allTracks, tracks: loadTracksObj.tracksArr, hasreceiveddata: true, shuffle: getState().tracklist.shuffle, replace: false, genre: genre })
  }
}

export function toggleShuffleTracks() {
  return function(dispatch, getState) {
    if (getState().tracklist.shuffle){
      dispatch({ type: C.RECEIVE_TRACKS_DATA, allTracks: getState().tracklist.allTracks, tracks: getState().tracklist.tracks, hasreceiveddata: true, shuffle: false, replace: false, genre: getState().tracklist.genre })
    } else {
      dispatch({ type: C.RECEIVE_TRACKS_DATA, allTracks: getState().tracklist.allTracks, tracks: getState().tracklist.tracks, hasreceiveddata: true, shuffle: true, replace: false, genre: getState().tracklist.genre })
    }
  }
}

export function loadTracksByGenre(genre) {
  return function(dispatch, getState){
    let tracksOnloadArr = []
    let firstTimestamp
    let loadTracksObj = {}

    tracksRef.orderByChild('timestamp').on('value', (snapshot) => { // get snapshot to determine timestamp of first track
      snapshot.forEach((track) => {
        tracksOnloadArr.push(track.val())
      })
      firstTimestamp = tracksOnloadArr[0].timestamp
      loadTracksObj = loadTracks(firstTimestamp, genre)

      dispatch({ type: C.RECEIVE_TRACKS_DATA, allTracks: loadTracksObj.allTracks, tracks: loadTracksObj.tracksArr, hasreceiveddata: true, shuffle: false, replace: true, genre: genre })
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
