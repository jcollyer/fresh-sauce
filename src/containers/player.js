import React, { Component } from 'react'
import ReactRedux, { connect } from 'react-redux'
import C from '../constants'
import { setTrackPosition, stopTrack, playNextTrack } from '../actions/tracks'
import TrackProgress from '../components/track-progress'

let playingTrackInterval = undefined
let oldTrackId = undefined
let player = undefined

class Player extends Component {
  playNextTrack() {
    this.props.playNextTrack()
  }
  toggleSCTrack(player) {
    var that = this;
    player.isPaused((paused) => {
      if(paused == true ) {
        player.play()
        this.whileSCTrackPlaying(player)
      } else {
        clearInterval(playingTrackInterval)
        this.props.stopTrack()
        player.pause()
      }
    });
  }
  whileSCTrackPlaying(player) {
    clearInterval(playingTrackInterval);
    playingTrackInterval = setInterval(() => {
      player.getPosition((position) => {
        this.props.setTrackPosition(position)
      })
    },1000)
  }
  whileYTTrackPlaying(player) {
    clearInterval(playingTrackInterval)
    playingTrackInterval = setInterval(() => {
      let position = player.getCurrentTime() * 1000
      this.props.setTrackPosition(position)
    },1000)
  }
  updateYTPlayer(event) {
    switch(event) {
      case event.data == "0":
        that.playNextTrack()
      case event.data == "1":
       this.whileYTTrackPlaying(event.target)
      case event.data == "2":
        clearInterval(playingTrackInterval)
        this.props.stopTrack()
      default: return console.log("updateYTPlayer", event.data)
    }

  }
  trackProgressClick(position, player) {
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
      if (track.kind === "sc"){
          let that = this;

          if (player && player.a) {player.destroy()}
          var widgetIframe = document.getElementById('soundcloud_widget')

          player = SC.Widget(widgetIframe)

          player.bind(SC.Widget.Events.READY, () => {
            player.load("https://api.soundcloud.com/tracks/"+track.id, {
              auto_play: true
            })
          })

          player.bind(SC.Widget.Events.FINISH, () => {
            that.playNextTrack()
          })

          this.whileSCTrackPlaying(player);
          oldTrackId = track.id

        } else { // else YouTube

          let that = this;

          function onPlayerReady(event) {
            that.whileYTTrackPlaying(event.target)
            oldTrackId = track.id
          }

          function onPlayerStateChange(event) {
            that.updateYTPlayer(event)
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
            <button onClick={ () => this.playNextTrack() }>NEXT</button>
          </div>

          <TrackProgress progressPercentage={trackPercentage} duration={track.duration} trackProgressClick={(position) => this.trackProgressClick(position, player)} />

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
