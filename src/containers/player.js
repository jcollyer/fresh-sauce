import React, { Component } from 'react'
import ReactRedux, { connect } from 'react-redux'
import C from '../constants'
import { setTrackPosition, stopTrack, playNextTrack } from '../actions/tracks'
import TrackProgress from '../components/track-progress'

let playingTrackInterval = undefined
let oldTrackId = undefined
let player = undefined

class Player extends Component {
  toggleSCTrack(player) {
    var that = this;
    player.isPaused((paused) => {
      if(paused == true ) {
        player.play()
        this.whileTrackPlaying(player)
      } else {
        clearInterval(playingTrackInterval)
        this.props.stopTrack()
        player.pause()
      }
    });
  }
  whileTrackPlaying(player) {
    let that = this;
    clearInterval(playingTrackInterval);

    playingTrackInterval = setInterval(() => {
      if(that.props.track.kind === 'sc'){ // if Soundcloud
        player.getPosition((position) => {
          this.props.setTrackPosition(position)
        })

      } else { // else play YouTube
        let position = player.getCurrentTime() * 1000
        this.props.setTrackPosition(position)
      }
    },2000)
  }
  trackProgressClick(position) {
    this.props.setTrackPosition(position)
    let trackPosition = position

    if (player.playVideo) { // if player is YouTube
      trackPosition = trackPosition / 1000
    }

    player.seekTo(trackPosition)
  }
  render() {
    const { track, trackPlaying, trackPosition, trackPercentage } = this.props
    const src = "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F" + track.id + "&show_artwork=true";

    if (trackPlaying && track.id != oldTrackId) {
      let that = this;
      if (track.kind === "sc"){
          if (player && player.a) {player.destroy()}
          var widgetIframe = document.getElementById('soundcloud_widget')

          player = SC.Widget(widgetIframe)

          player.bind(SC.Widget.Events.READY, () => {
            player.load("https://api.soundcloud.com/tracks/"+track.id, {
              auto_play: true
            })
          })

          player.bind(SC.Widget.Events.FINISH, () => {
            that.props.playNextTrack()
          })

          that.whileTrackPlaying(player);
          oldTrackId = track.id

        } else { // else YouTube

          function onPlayerReady(event) {
            that.whileTrackPlaying(event.target)
            oldTrackId = track.id
          }

          function onPlayerStateChange(event) {
            switch(event.data) {
              case 0: // video finished
                that.props.playNextTrack()
              default: return console.log("updateYTPlayer", event.data)
            }
          }

          if (player && player.a) {player.destroy()}

          player = new YT.Player('yt-player', {
            height: '100',
            width: '200',
            videoId: track.id,
            playerVars: { 'autoplay': 1, 'controls': 0,'autohide':1,'wmode':'opaque' },
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          })
        }
    }

    return (
        <div id="player" className={player ? "" : "hide"}>
          <iframe id="soundcloud_widget" width="100%" height="166" scrolling="no" frameBorder="no" src={src} className="offscreen"></iframe>
          <div id="track-artwork">

            <div id="yt-player" className={track.kind === "yt" ? "" : "offscreen"}></div>

            <img
              src={track.artwork_url}
              className={track.kind === "sc" ? "" : "hide"}
              onClick={() => this.toggleSCTrack(player)}
            />

          </div>
          <div id="track-info">
            <p className="elipsis">{track.title}</p>
            <p>{track.artist}</p>
            <p>{trackPosition}</p>
            <button onClick={ () => this.props.playNextTrack() }>NEXT</button>
          </div>

          <TrackProgress progressPercentage={trackPercentage} duration={track.duration} trackProgressClick={(position) => this.trackProgressClick(position)} />

        </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    track: appState.tracks.currentTrack,
    trackPlaying: appState.tracks.trackPlaying,
    trackPosition: appState.tracks.trackPosition,
    trackPercentage: appState.tracks.trackPercentage
  }
}

export default connect(mapStateToProps,  { setTrackPosition, stopTrack, playNextTrack })(Player)
