import C from '../constants'
import store from '../store'
import { playNextTrack } from '../actions/tracks'

function setSoundCloud(){
	//get Soundcloud Widget
	let playerSC = SC.Widget(document.getElementById('soundcloud_widget'))
	playerSC.bind(SC.Widget.Events.READY, () => {
		console.log('SC Widget Ready...')
	})
	playerSC.bind(SC.Widget.Events.FINISH, () => {
		store.dispatch(playNextTrack())
		console.log('play next track from -- SC')
	})
	return playerSC
}

function setYouTube(){
	//get YouTube Widget
	let playerYT = new YT.Player('yt_widget', {
		height: '100',
		width: '200',
		videoId: '2a4Uxdy9TQY', //some randome ID
		playerVars: { 'autoplay': 0, 'controls': 0,'autohide':1,'wmode':'opaque' }
	})
	return playerYT
}

export function setPlayers() {
	let playerSC = setSoundCloud()
	let playerYT = setYouTube()
  let playerOptions = { playerSC, playerYT }

  return { type: C.SET_PLAYERS, playerOptions }
}
