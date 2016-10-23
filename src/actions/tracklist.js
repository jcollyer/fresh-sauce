import C from '../constants'
import Firebase from 'firebase'
const tracksRef = new Firebase(C.FIREBASE).child('tracks')
import { sanitizeTrack, YTDurationToSeconds } from '../utils'

let recursiveTracksArr = []

function recursivelyGetTracks(startAt, genre) {
  let sanitizedTrack = {}
  let allTracks = []
  tracksRef.orderByChild('timestamp').startAt(startAt).limitToFirst(30).on('value', (snapshot) => {
    snapshot.forEach((track) => {
      sanitizedTrack = sanitizeTrack(track.val())

      allTracks.push(sanitizedTrack)
      if (sanitizedTrack.genre.indexOf(genre) > -1) { // Push only tracks with correct genre
        recursiveTracksArr.push(sanitizedTrack)
      }
    })
  })

  if(recursiveTracksArr.length < 5) {
    const startAt = allTracks[allTracks.length-1].timestamp
    return recursivelyGetTracks(startAt, genre)
  } else {
    return recursiveTracksArr
  }
}

function loadTracks(startAt, genre) {
  console.log('startAt: ', startAt, 'genre: ', genre)
  let tracksArr = []
  let sanitizedTrack = {}
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

  return { tracksArr: tracksArr,  allTracks: allTracks }
}

export function loadAllTracks() {
  return function(dispatch, getState){
    let tracksOnloadArr = []
    let firstTimestamp
    let loadTracksObj
    let trackPlaying = getState().track.trackPlaying
    tracksRef.orderByChild('timestamp').on('value', (snapshot) => { // get snapshot to determine timestamp of first track
      snapshot.forEach((track) => {
        tracksOnloadArr.push(sanitizeTrack(track.val()))
      })
      firstTimestamp = tracksOnloadArr[0].timestamp
      loadTracksObj = loadTracks(firstTimestamp, '')

      dispatch({ type: C.RECEIVE_TRACKS_DATA, allTracks: loadTracksObj.allTracks, tracks: loadTracksObj.tracksArr, hasreceiveddata: true, shuffle: false, replace: true, genre: '' })
      if(!trackPlaying) { // set first track in tracklist
        dispatch({ type: C.SET_TRACK, track: tracksOnloadArr[0], trackPlaying: false })
      }
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
    let trackPlaying = getState().track.trackPlaying
    tracksRef.orderByChild('timestamp').on('value', (snapshot) => { // get snapshot to determine timestamp of first track
      snapshot.forEach((track) => {
        tracksOnloadArr.push(track.val())
      })
      firstTimestamp = tracksOnloadArr[0].timestamp
      recursiveTracksArr = [] //Clear out recursiveTracksArr when switching genres
      loadTracksObj = loadTracks(firstTimestamp, genre)

      if (loadTracksObj.tracksArr.length < 8) { // If has a genre but can't find enough matching tracks in the 30 track limit
        const startAt = loadTracksObj.allTracks[loadTracksObj.allTracks.length-1].timestamp
        loadTracksObj.tracksArr = loadTracksObj.tracksArr.concat(recursivelyGetTracks(startAt, genre)) // add first page tracks + recursive tracks
      }

      dispatch({ type: C.RECEIVE_TRACKS_DATA, allTracks: loadTracksObj.allTracks, tracks: loadTracksObj.tracksArr, hasreceiveddata: true, shuffle: false, replace: true, genre: genre })
      if(!trackPlaying) { // set first track in tracklist
        dispatch({ type: C.SET_TRACK, track: loadTracksObj.tracksArr[0], trackPlaying: false })
      }
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
