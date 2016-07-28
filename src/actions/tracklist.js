import C from '../constants'
import Firebase from 'firebase'
const tracksRef = new Firebase(C.FIREBASE).child('tracks')

function loadTracks(startAt){
  console.log(startAt)
  const tracksArr = []
  tracksRef.orderByChild('timestamp').startAt(startAt).limitToFirst(15).on('value', (snapshot) => {
    snapshot.forEach((track) => {
      tracksArr.push(track.val())
    })
  })
  return tracksArr
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
