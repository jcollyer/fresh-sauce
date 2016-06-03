import React, { Component } from 'react'
import ReactRedux, { connect } from 'react-redux'
import C from '../constants'
import store from '../store'

class Player extends Component {

	toggleTrack() {
    var that = this;
    player.isPaused(function(paused){
      if(paused == true ) {
        that.playTrack();
      } else {
        that.pauseTrack();
      }
    });
  }
	getPlayer() {
    // var that = this;
    // if (this.state.playbackInterval) clearInterval(this.state.playbackInterval);

    var widgetIframe = document.getElementById('soundcloud_widget');
    player = SC.Widget(widgetIframe);

    player.bind(SC.Widget.Events.READY, function(){
      player.load("https://api.soundcloud.com/tracks/"+that.state.id, {
        auto_play: true
      });
    });

    // player.bind(SC.Widget.Events.FINISH, function() {
    //   clearInterval(that.state.playbackInterval);
    //   that.clickNextTrack();
    // });


    // this.getCurrentTimeInterval();
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
		const { track } = this.props
		const src = "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F" + track.id + "&show_artwork=true";
		return (
				<div>
					<iframe id="soundcloud_widget" width="100%" height="166" scrolling="no" frameBorder="no" src={src}></iframe>
				</div>
    );
	}
}

const mapStateToProps = (appState) => {
  return {
    track: appState.tracks.currentTrack
  }
}

export default connect(mapStateToProps)(Player)
