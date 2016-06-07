import React, { Component } from 'react'
import ReactRedux, { connect } from 'react-redux'
import C from '../constants'
import store from '../store'

class Player extends Component {
	toggleTrack(player) {
		var that = this;
    player.isPaused(function(paused){
      if(paused == true ) {
        player.play();
      } else {
        player.pause();
      }
    });
  }
  playTrack() {
    player.play();
    // player.setVolume(this.state.currentVolume);
    // this.getCurrentTimeInterval();
  }
  // getCurrentTimeInterval() {
  //   var that = this;
  //   this.state.playbackInterval = setInterval(function(){
  //     that.getCurrentTime();
  //   }, 300);
  // },
  pauseTrack() {
    // if (this.state.playbackInterval > 0) clearInterval(this.state.playbackInterval);
    player.pause();
  }
	render() {
		const { track, player } = this.props
		const src = "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F" + track.id + "&show_artwork=true";
		return (
				<div>
					<iframe id="soundcloud_widget" width="100%" height="166" scrolling="no" frameBorder="no" src={src}></iframe>
					<div id="yt-player"></div>
					<img src={track.artwork_url} />
					<button onClick={() => this.toggleTrack(player)}>toggle</button>
					<hr />
				</div>
    )
	}
}

const mapStateToProps = (appState) => {
  return {
    track: appState.tracks.currentTrack,
		player: appState.tracks.player
  }
}

export default connect(mapStateToProps)(Player)
