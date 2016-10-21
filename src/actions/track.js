import C from '../constants'
import Firebase from 'firebase'
const ref = new Firebase('https://fresh-sauce.firebaseio.com/')
const idsRef = ref.child('ids')
const tracksRef = ref.child('tracks')
const favoritesRef = ref.child('favorites')
const usersRef = ref.child('users')

export function togglePlayTrack(track) {
  return function(dispatch, getState){
    let trackPlaying = getState().track.trackPlaying
    let newTrack = getState().track.currentTrack.id === track.id ? false : true
    let player = getState().track.currentTrack.kind === 'sc' ? getState().players.playerOptions.playerSC : getState().players.playerOptions.playerYT
    pauseTrack(getState().track.currentTrack.kind, player) //allways pause track first

    if (trackPlaying && !newTrack) {
      let playerKind = getState().track.currentTrack.kind
      let player = playerKind === 'sc' ? getState().players.playerOptions.playerSC : getState().players.playerOptions.playerYT
      dispatch({ type: C.SET_TRACK,  track: track, trackPlaying: false, player: player })
    } else {

      let playerKind = track.kind
      let player = playerKind === 'sc' ? getState().players.playerOptions.playerSC : getState().players.playerOptions.playerYT
      let currentTime
      let resumePlayback
      if (newTrack) {
        currentTime = 0
        resumePlayback = false
      } else {
        currentTime = playerKind === 'sc' ? player.audio.currentTime : player.getCurrentTime()
        resumePlayback = currentTime > 0 ? true : false
      }

      dispatch({ type: C.SET_TRACK, track: track, trackPlaying: true, player: player })
      playTrack(playerKind, player, track.id, resumePlayback)
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

    //pause current track
    let playerKind = getState().track.currentTrack.kind
    let player = playerKind === 'sc' ? getState().players.playerOptions.playerSC : getState().players.playerOptions.playerYT
    pauseTrack(playerKind, player)

    let trackIds = []
    getState().tracklist.tracks.map((track, index) => { //loop through tracklist, find current track (so you know the index) use the index to play the next/prev track
      if(track.id === currentTrackId) { //find current track for index
        trackIds.push(currentTrackId)
        if (shuffleTracks) {
          nextTrack = getState().tracklist.tracks[Math.floor(randomIndex)]

          dispatch({ type: C.SET_TRACK, track: nextTrack, trackPlaying: true, player: player })
        } else if(direction === 'next') {
          if(getState().tracklist.tracks[getState().tracklist.tracks.length-1].id != currentTrackId){ // if currentTrack is not the LAST track in playlist
            nextTrack = getState().tracklist.tracks[index + 1]
            player = nextTrack.kind === 'sc' ? getState().players.playerOptions.playerSC : getState().players.playerOptions.playerYT
            dispatch({ type: C.SET_TRACK, track: nextTrack, trackPlaying: true, player: player })
            playTrack(nextTrack.kind, player, nextTrack.id, false)
          }
        } else if(direction === 'prev') {
          if(getState().tracklist.tracks[0].id != currentTrackId){ // if currentTrack is not the FIRST track in playlist
            nextTrack = getState().tracklist.tracks[index - 1]
            dispatch({ type: C.SET_TRACK, track: nextTrack, trackPlaying: true, player: player })
          }
        }
      }
    })

    if(trackIds.length == 0) { // currentTrack is outside contexst (user went to another page after playing track)
      let nextTrack = getState().tracklist.tracks[0]
      let player = nextTrack.kind === 'sc' ? getState().players.playerOptions.playerSC : getState().players.playerOptions.playerYT
      dispatch({ type: C.SET_TRACK, track: nextTrack, trackPlaying: true, player: player })
      playTrack(nextTrack.kind, player, nextTrack.id, false)
    }
  }
}

function playTrack(playerKind, player, trackId, resumePlayback){
  if(playerKind === 'sc') {
    if (resumePlayback) { // if track is being resumed
      let currentTime = player.audio.currentTime
      player.play({streamUrl: 'https://api.soundcloud.com/tracks/'+trackId+'/stream'});
      player.audio.currentTime = currentTime
    } else {
      let currentTime = 0
      player.play({streamUrl: 'https://api.soundcloud.com/tracks/'+trackId+'/stream'});
      player.audio.currentTime = currentTime
    }
  } else { // YT track
    if (resumePlayback) { // if track is being resumed
      player.playVideo()
    } else {
      player.cueVideoById(trackId)
      player.playVideo()
    }
  }
}

export function pauseTrack(playerKind, player){
  if(playerKind === 'sc'){
    player.pause()
  } else {
    player.pauseVideo()
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
