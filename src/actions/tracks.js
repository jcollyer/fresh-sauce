import C from '../constants'
import Firebase from 'firebase'
const tracksRef = new Firebase(C.FIREBASE).child('items')

export function startListeningToTracks() {
  return function(dispatch, getState){
    tracksRef.on("value",function(snapshot) {
      const tracksArr = []
      const tracks = snapshot.val()
      for(var track in tracks){
        tracksArr.push(tracks[track].track)
      }
      dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: tracksArr });
    });
  }
}

export function setTrack(track, player) {
  return { type: C.SET_TRACK, track: track, trackPlaying: true }
}

export function setTrackPosition(trackPosition) {
  return { type: C.SET_TRACK_POSITION, trackPosition }
}

export function stopTrack() {
  return { type: C.STOP_TRACK }
}

export function playNextTrack() {
  return function(dispatch, getState){
    let currentTrack = getState().tracks.currentTrack.id;
    let nextTrack;
    getState().tracks.tracks.map((track, index) => {
      if(track.id === currentTrack) {
        nextTrack = getState().tracks.tracks[index - 1] // minus one because tracks displayed in reverse chronological order
      }
    })
    dispatch({ type: C.SET_TRACK, track: nextTrack, trackPlaying: true });

  }
}
