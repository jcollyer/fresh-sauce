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
	var player;
	var widgetIframe = document.getElementById('soundcloud_widget');
	player = SC.Widget(widgetIframe);

	player.bind(SC.Widget.Events.READY, function(){
		player.load("https://api.soundcloud.com/tracks/"+track.id, {
			auto_play: true
		});
	});
	return { type: C.SET_TRACK, track: track, player: player }
}
