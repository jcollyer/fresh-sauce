import C from '../constants'
import Firebase from 'firebase'
const ref = new Firebase('https://fresh-sauce.firebaseio.com/')
const idsRef = ref.child('ids')
const tracksRef = ref.child('tracks')
const favoritesRef = ref.child('favorites')
const usersRef = ref.child('users')

export function setTrack(track) {
  return { type: C.SET_TRACK, track: track, trackPlaying: true }
}

export function deleteTrack(track) {
  tracksRef.child(track.id).remove();
  idsRef.child(track.id).remove();
  return { type: C.DELETE_TRACK, track: track }
}

export function favoriteTrack(track) {
  return function(dispatch, getState) {
    let uid = getState().auth.uid
    usersRef.child(uid).child('favorites').child(track.id).set({ id: track.id, timestamp: Date.now() })
  }
}

export function setTrackPosition(trackPosition) {
  return { type: C.SET_TRACK_POSITION, trackPosition }
}

export function stopTrack() {
  return { type: C.STOP_TRACK }
}

export function playNextTrack() {
  return function(dispatch, getState){
    let currentTrack = getState().tracks.currentTrack.id
    let nextTrack
    getState().tracklist.tracks.map((track, index) => {
      if(track.id === currentTrack) {
        nextTrack = getState().tracklist.tracks[index - 1] // minus one because tracks displayed in reverse chronological order
      }
    })
    dispatch({ type: C.SET_TRACK, track: nextTrack, trackPlaying: true })
  }
}

export function setTrackDetail(id) {
  return function(dispatch, getState){
    let trackDetail = {}
    tracksRef.orderByChild('id').equalTo(id).on("value", function(snapshot) {
      trackDetail = snapshot.val()[Object.keys(snapshot.val())]
      dispatch({ type: C.SET_TRACK_DETAIL, trackDetail })
    })
  }
}
