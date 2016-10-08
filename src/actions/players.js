import C from '../constants'
import store from '../store'
import { startListeningToAuth } from './auth'
import { playNextTrack } from './track'
import SoundCloudAudio from 'soundcloud-audio'

let playerSC
let scPlayer = new SoundCloudAudio('b5e21578d92314bc753b90ea7c971c1e');

function setSoundCloud(){
  playerSC = scPlayer;

  scPlayer.on('ended', function () {
    store.dispatch(playNextTrack('next'))
    console.log(scPlayer.track.title + ' just ended! play next track')
  });


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
