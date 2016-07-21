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
      dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: tracksArr })
    })
  }
}
