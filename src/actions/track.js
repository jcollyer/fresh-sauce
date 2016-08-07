import C from '../constants'
import Firebase from 'firebase'
const ref = new Firebase('https://fresh-sauce.firebaseio.com/')
const idsRef = ref.child('ids')
const tracksRef = ref.child('tracks')
const favoritesRef = ref.child('favorites')
const usersRef = ref.child('users')
import { sanitizeTrack } from './tracklist'

export function setTrack(track) {
  return function(dispatch, getState) {
    if(track.id !== getState().track.currentTrack.id){
      dispatch({type: C.SET_TRACK, track: track, trackPlaying: true})
    } else {
      let trackPlaying = getState().track.trackPlaying
      let playerKind = getState().track.currentTrack.kind
      let player = playerKind === 'sc' ? getState().players.playerOptions.playerSC : getState().players.playerOptions.playerYT
      if(trackPlaying){
        pauseTrack(playerKind, player)
        dispatch({type: C.SET_TRACK, track: track, trackPlaying: false})
      } else {
        playTrack(playerKind, player)
        dispatch({type: C.SET_TRACK, track: track, trackPlaying: true})
      }
    }
  }
}

export function deleteTrack(track) {
  return function(dispatch) {
    tracksRef.child(track.id).remove()
    idsRef.child(track.id).remove()
    dispatch({ type: C.DELETE_TRACK, track: track })
    alert('track deleted ', track.title)
  }
}

export function toggleFeatueTrack(track) {
  return function(dispatch, getState) {
    getState().tracklist.tracks.map((t) => {
      if(t.id === track.id) {
        if(track.featured) {
          tracksRef.child(track.id).update({featured: false})
          alert('track un-featued: ', track.title)
        } else {
          tracksRef.child(track.id).update({featured: true})
          alert('track featued: ', track.title)
        }
      }
    })
  }
}

export const toggleFavoriteTrack = (track) => {
// export function toggleFavoriteTrack(track) {
  return function(dispatch, getState) {
    let uid = getState().auth.uid

    // if user is not logged in
    if (uid === null) {
      dispatch({ type: C.AUTH_LOGIN, displayingLogInPanel: true })
    } else {

      // convert favorites object to array
      let favArray = []
      for (let fav in getState().auth.favorites){
        if(fav === track.id) {
          favArray.push(fav)
        }
      }

      // check if track is already favorited
      if (favArray.indexOf(track.id) > -1){
        usersRef.child(uid).child('favorites').child(track.id).remove()
      } else {
        usersRef.child(uid).child('favorites').child(track.id).set(track)
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
    let currentTrackId = getState().track.currentTrack.id
    let shuffleTracks = getState().tracklist.shuffle
    let randomIndex = Math.random() * (15 - 0) + 0

    getState().tracklist.tracks.map((track, index) => {
      if(track.id === currentTrackId) {
        if (shuffleTracks) {
          nextTrack = getState().tracklist.tracks[Math.floor(randomIndex)]
          dispatch({ type: C.SET_TRACK, track: nextTrack, trackPlaying: true })
        } else if(direction === 'next') {
          if(getState().tracklist.tracks.splice(-1)[0].id != currentTrackId){ // if currentTrack is not the LAST track in playlist
            nextTrack = getState().tracklist.tracks[index + 1]
            dispatch({ type: C.SET_TRACK, track: nextTrack, trackPlaying: true })
          }
        } else if(direction === 'prev') {
          if(getState().tracklist.tracks[0].id != currentTrackId){ // if currentTrack is not the FIRST track in playlist
            nextTrack = getState().tracklist.tracks[index - 1]
            dispatch({ type: C.SET_TRACK, track: nextTrack, trackPlaying: true })
          }
        }
      }
    })
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

export function playToggleTrack(playingTrackInterval) {
  clearInterval(playingTrackInterval)
  return function(dispatch, getState){
    let trackPlaying = getState().track.trackPlaying
    let player = {}
    let playerKind = getState().track.currentTrack.kind

    if(playerKind === 'sc'){
      player = getState().players.playerOptions.playerSC
    } else {
      player = getState().players.playerOptions.playerYT
    }

    if(trackPlaying){
      pauseTrack(playerKind, player)
      dispatch({ type: C.SET_TRACK, track: getState().track.currentTrack, trackPlaying: false })
    } else {
      playTrack(playerKind, player)
      dispatch({ type: C.SET_TRACK, track: getState().track.currentTrack , trackPlaying: true })
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
