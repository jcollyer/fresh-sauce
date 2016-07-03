import React, { Component } from 'react'
import ReactRedux, { connect } from 'react-redux'
import C from '../constants'
import store from '../store'
import { setTrackPosition } from '../actions/tracks'

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
	play(player) {
		player.play()
		this.whileTrackPlaying(player)
	}
	pause(player) {
		clearInterval(playingTrackInterval)
		player.pause()
	}
	whileTrackPlaying(player) {
		clearInterval(playingTrackInterval);
		playingTrackInterval = setInterval(() => {
			player.getPosition((position) => {
				store.dispatch(setTrackPosition(position))
			})
		},1000)
	}
	render() {
		const { track, player, trackPlaying, trackPosition } = this.props
		const src = "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F" + track.id + "&show_artwork=true";

		if (trackPlaying) {
			this.whileTrackPlaying(player);
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
						<p>{trackPosition}</p>
					</div>
				</div>
    )
	}
}

const mapStateToProps = (appState) => {
	console.log(appState.tracks.trackPosition)
  return {
    track: appState.tracks.currentTrack,
		player: appState.tracks.player,
		trackPlaying: appState.tracks.trackPlaying,
		trackPosition: appState.tracks.trackPosition
  }
}

export default connect(mapStateToProps)(Player)
