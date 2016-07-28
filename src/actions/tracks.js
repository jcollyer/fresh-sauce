import C from '../constants'
import Firebase from 'firebase'
const ref = new Firebase('https://fresh-sauce.firebaseio.com/')
const idsRef = ref.child('ids')
const tracksRef = ref.child('tracks')
const favoritesRef = ref.child('favorites')
const usersRef = ref.child('users')

export function setTrack(track) {
  return function(dispatch, getState) {
    dispatch({type: C.SET_TRACK, track: track, trackPlaying: true, shuffle: getState().tracks.shuffle })
  }
}

export function deleteTrack(track) {
  return function(dispatch) {
    tracksRef.child(track.id).remove();
    idsRef.child(track.id).remove();
    dispatch({ type: C.DELETE_TRACK, track: track })
  }
}

export function toggleFavoriteTrack(trackId) {
  return function(dispatch, getState) {
    let uid = getState().auth.uid

    // if user is not logged in
    if (uid === null) {
      dispatch({ type: C.AUTH_LOGIN, displayingLogInPanel: true })
    } else {

      // convert favorites object to array
      let favArray = []
      for (let fav in getState().auth.favorites){
        if(fav === trackId) {
          favArray.push(fav)
        }
      }
      // check if track is already favorited
      if (favArray.indexOf(trackId) > -1){
        usersRef.child(uid).child('favorites').child(trackId).remove()
      } else {
        usersRef.child(uid).child('favorites').child(trackId).set({ id: trackId, timestamp: Date.now() })
      }
    }
  }
}

export function setTrackPosition(trackPosition) {
  return { type: C.SET_TRACK_POSITION, trackPosition }
}

export function stopTrack() {
  return { type: C.STOP_TRACK }
}

export function playNextTrack(direction) {
  return function(dispatch, getState){
    let nextTrack
    let currentTrackId = getState().tracks.currentTrack.id
    let shuffleTracks = getState().tracks.shuffle
    let randomIndex = Math.random() * (15 - 0) + 0

    getState().tracklist.tracks.map((track, index) => {
      if(track.id === currentTrackId) {
        // debugger;
        if (shuffleTracks) {
          nextTrack = getState().tracklist.tracks[Math.floor(randomIndex)]
        } else if(direction === 'next') {
          nextTrack = getState().tracklist.tracks[index + 1]
        } else if(direction === 'prev') {
          nextTrack = getState().tracklist.tracks[index - 1]
        }
        dispatch({ type: C.SET_TRACK, track: nextTrack, trackPlaying: true, shuffle: getState().tracks.shuffle })
      }
    })
  }
}

export function toggleShuffleTracks() {
  return function(dispatch, getState) {
    if (getState().tracks.shuffle){
      dispatch({ type: C.SET_TRACK, track: getState().tracks.currentTrack, trackPlaying: getState().tracks.trackPlaying, shuffle: false })
    } else {
      dispatch({ type: C.SET_TRACK, track: getState().tracks.currentTrack, trackPlaying: getState().tracks.trackPlaying, shuffle: true })
    }
  }
}

function playTrack(playerKind, player){
  if(playerKind === 'sc'){
    player.play()
  } else {
    player.playVideo()
  }
}

export function pauseTrack(playerKind, player){
  if(playerKind === 'sc'){
    player.pause()
  } else {
    player.pauseVideo()
  }
}

export function playToggleTrack() {
  return function(dispatch, getState){
    let trackPlaying = getState().tracks.trackPlaying
    let player = {}
    let playerKind = getState().tracks.currentTrack.kind

    if(playerKind === 'sc'){
      player = getState().players.playerOptions.playerSC
    } else {
      player = getState().players.playerOptions.playerYT
    }

    if(trackPlaying){
      pauseTrack(playerKind, player)
      dispatch({ type: C.SET_TRACK, track: getState().tracks.currentTrack, shuffle: getState().tracks.shuffle, trackPlaying: false })
    } else {
      playTrack(playerKind, player)
      dispatch({ type: C.SET_TRACK, track: getState().tracks.currentTrack, shuffle: getState().tracks.shuffle , trackPlaying: true })
    }
  }
}

export function isTrackFavoritedByUser(trackId){
  return function(dispatch, getState) {
    if(getState().auth.username != 'guest'){
      let userFavorites = getState().auth.favorites
      // make sure user favorites is not an empty object
      if(Object.keys(userFavorites).length > 0){
        let userFavArray = []
        for(let fav in userFavorites) {
          userFavArray.push(fav)
        }
        return userFavArray.indexOf(trackId) > -1
      }
    }
  }
}

// for /tracks/<trackID> urls
export function setTrackDetail(id) {
  return function(dispatch, getState){
    let trackDetail = {}
    tracksRef.orderByChild('id').equalTo(id).on("value", function(snapshot) {
      trackDetail = snapshot.val()[Object.keys(snapshot.val())]
      dispatch({ type: C.SET_TRACK_DETAIL, trackDetail })
    })
  }
}
