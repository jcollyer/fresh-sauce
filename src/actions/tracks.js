import C from '../constants'
import Firebase from 'firebase'
import utils from '../utils'
import initialState from '../api/initial-state'
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

export function setTrack(track) {
	if (track.kind === "sc") {
		var player;
		var widgetIframe = document.getElementById('soundcloud_widget');
		player = SC.Widget(widgetIframe);

		player.bind(SC.Widget.Events.READY, () => {
			player.load("https://api.soundcloud.com/tracks/"+track.id, {
				auto_play: true
			})
		})
		return { type: C.SET_TRACK, track: track, player: player }

	} else {
		var player;
    // function onYouTubeIframeAPIReady() {
			debugger;
      player = new YT.Player('yt-player', {
        height: '100',
        width: '200',
        videoId: track.id,
				playerVars: { 'autoplay': 1, 'controls': 0,'autohide':1,'wmode':'opaque' }
      });
    // }
		return { type: C.SET_TRACK, track: track, player: player }
	}
}
