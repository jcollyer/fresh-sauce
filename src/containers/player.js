import React, { Component } from 'react'
import ReactRedux, { connect } from 'react-redux'
import C from '../constants'
import store from '../store'
let playingTrackInterval

class Player extends Component {
	toggleSCTrack(player) {
		var that = this;
    player.isPaused((paused) => {
      if(paused == true ) {
        player.play();
      } else {
        this.pause(player);
      }
    });
  }
	pause(player) {
		player.pause();
		clearInterval(playingTrackInterval)
	}
	trackPlaying() {
		playingTrackInterval = setInterval(() => {
			console.log('hi');
		},1000)
	}
	render() {
		const { track, player, trackPlaying } = this.props
		const src = "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F" + track.id + "&show_artwork=true";
		// updateTrackData(player)

		if (trackPlaying) {
			this.trackPlaying();
		}
		return (
				<div id="player" className={player ? "" : "hide"}>
					<iframe id="soundcloud_widget" width="100%" height="166" scrolling="no" frameBorder="no" src={src} className="offscreen"></iframe>
					<div id="track-artwork">
						<div id="yt-player" className={track.kind === "sc" ? "offscreen" : ""}></div>
						<img
							src={track.artwork_url}
							className={track.kind === "sc" ? "" : "hide"}
							onClick={() => this.toggleSCTrack(player)}
						/>
					</div>
					<div id="track-info">
						<h3>{track.title}</h3>
						<p>{track.artist}</p>
					</div>
				</div>
    )
	}
}

const mapStateToProps = (appState) => {
  return {
    track: appState.tracks.currentTrack,
		player: appState.tracks.player,
		trackPlaying: appState.tracks.trackPlaying
  }
}

export default connect(mapStateToProps)(Player)
