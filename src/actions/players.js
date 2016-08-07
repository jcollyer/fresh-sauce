import C from '../constants'
import store from '../store'
import { startListeningToAuth } from './auth'
import { playNextTrack } from './track'

let playerSC

function setSoundCloud(){
  //get Soundcloud Widget
  let playerSC = SC.Widget(document.getElementById('soundcloud_widget'))
  playerSC.bind(SC.Widget.Events.READY, () => {
    console.log('SC Widget Ready...')
  })
  playerSC.bind(SC.Widget.Events.FINISH, () => {
    store.dispatch(playNextTrack('next'))
    console.log('play next track from -- SC')
  })
  return playerSC
}

function setYouTube(callback){
  function onPlayerReady(event) {
    // setup Firebase listeners
    store.dispatch(startListeningToAuth())
  }

  function onPlayerStateChange(event) {
    switch(event.data) {
      case 0: // video finished
        store.dispatch(playNextTrack('next'))
      default: return console.log("updateYTPlayer", event.data)
    }
  }

  //get YouTube Widget
  window.onYouTubeIframeAPIReady = function() {
    let playerYT = new YT.Player('yt_widget', {
      height: '100',
      width: '200',
      videoId: '2a4Uxdy9TQY', //some randome ID
      playerVars: { 'autoplay': 0, 'controls': 0,'autohide':1,'wmode':'opaque' },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })
    callback(playerYT)
  }
}

export function setPlayers() {
  return function(dispatch){
    playerSC = setSoundCloud()
    function callback(playerYT) {
      let playerOptions = { playerSC, playerYT }
      dispatch({ type: C.SET_PLAYERS, playerOptions })
    }
    setYouTube(callback)
  }
}
