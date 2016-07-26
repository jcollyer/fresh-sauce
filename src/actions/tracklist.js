import C from '../constants'
import Firebase from 'firebase'
const tracksRef = new Firebase(C.FIREBASE).child('tracks')

export function startListeningToTracks() {
  return function(dispatch, getState){

    tracksRef.orderByChild("timestamp").on("value", (snapshot) => {
      const tracksArr = []
      snapshot.forEach((track) => {
        tracksArr.push(track.val())
      })

      dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: tracksArr })
      // set first track in tracklist
      dispatch({ type: C.SET_TRACK, track: tracksArr[0], trackPlaying: true })
    })
  }
}
