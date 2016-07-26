import C from '../constants'
import Firebase from 'firebase'
const tracksRef = new Firebase(C.FIREBASE).child('tracks')

export function startListeningToTracks() {
  return function(dispatch, getState){
    tracksRef.on("value",function(snapshot) {
      const tracksArr = []
      const tracks = snapshot.val()
      for(var track in tracks){
        tracksArr.push(tracks[track])
      }
      // set tracks array
      dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: tracksArr })

      // set first track in tracklist
      dispatch({ type: C.SET_TRACK, track: tracksArr.slice(-1)[0], trackPlaying: true })
    })
  }
}
