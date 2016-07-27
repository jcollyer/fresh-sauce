import React, { Component } from 'react'
import ReactRedux, { connect } from 'react-redux'
import C from '../constants'
import { setTrackPosition, stopTrack, playNextTrack, playPrevTrack, playToggleTrack, toggleFavoriteTrack, isTrackFavoritedByUser } from '../actions/tracks'
import TrackProgress from '../components/track-progress'
import { playTrack, toHHMMSS } from '../utils'

let playingTrackInterval = undefined
let oldTrackId = undefined

class Player extends Component {
  whileTrackPlaying(players) {
    clearInterval(playingTrackInterval)
    playingTrackInterval = setInterval(() => {
      if(this.props.track.kind === 'sc'){ // if Soundcloud
        let that = this
        players.playerSC.getPosition((position) => {
         that.props.setTrackPosition(position)
       })
      } else { // else play YouTube
        let position = players.playerYT.getCurrentTime() * 1000
        this.props.setTrackPosition(position)
      }
    }, 500)
  }
  checkPlayerArtistKind() {
    if(this.props.track && this.props.track.kind === 'sc'){ // if Soundcloud
      return this.props.track.artist
    } else if (this.props.track.kind === 'yt'){
      return this.props.track.tag_list[0]
    }
    return ''
  }
  trackProgressClick(position, players) {
    this.props.setTrackPosition(position)
    let trackPosition = position

    if (this.props.track.kind === 'yt') { // if player is YouTube
      trackPosition = trackPosition / 1000
      players.playerYT.seekTo(trackPosition)
    } else {
      players.playerSC.seekTo(trackPosition)
    }
  }
  convertToPrettyTime(time) {
    return toHHMMSS(time) || '0:00'
  }
  render() {
    const { track, trackPlaying, trackPosition, trackPercentage, players } = this.props
    const src = "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F" + track.id + "&show_artwork=true";
    if (trackPlaying && track.id != oldTrackId) { // if track is playing, with a new track ID
      playTrack(track, players)
      this.whileTrackPlaying(players)
      oldTrackId = track.id
    }

    return (
        <div id="player">
          <iframe id="soundcloud_widget" width="100%" height="166" scrolling="no" frameBorder="no" src={src} className="offscreen"></iframe>

          <div id="player-track-artwork">
            <div id="yt_widget" className={track.kind === "yt" ? "" : "offscreen"}></div>
            <img
              src={track.artwork_url}
              className={track.kind === "sc" ? "" : "hide"}
              onClick={() => this.toggleSCTrack(players.playerSC)} />
          </div>
          
          <div id="player-track-info">
            <TrackProgress progressPercentage={trackPercentage} duration={track.duration} trackProgressClick={(position) => this.trackProgressClick(position, players)} />
            <h3 className="elipsis">{track.title}</h3>
            <h4><span id='by'>by:</span> {this.checkPlayerArtistKind()} </h4>
            <div id='player-track-time'>{this.convertToPrettyTime(trackPosition)}/{this.convertToPrettyTime(track.duration)}</div>
            <div id='player-track-controls'>
              <i onClick={() => this.props.toggleFavoriteTrack(track.id)} className={this.props.isTrackFavoritedByUser(track.id) ? 'icon icon-heart' : 'icon icon-heart-outlined'}></i>
              <i onClick={() => this.props.playPrevTrack()} className='icon icon-skip-back'></i>
              <i onClick={() => this.props.playToggleTrack()} className={trackPlaying ? 'icon icon-pause' : 'icon icon-play'}></i>
              <i onClick={() => this.props.playNextTrack()} className='icon icon-skip-forward'></i>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    track: appState.tracks.currentTrack,
    trackPlaying: appState.tracks.trackPlaying,
    trackPosition: appState.tracks.trackPosition,
    trackPercentage: appState.tracks.trackPercentage,
    players: appState.players.playerOptions
  }
}

export default connect(mapStateToProps,  { setTrackPosition, stopTrack, playNextTrack, playPrevTrack, playToggleTrack, toggleFavoriteTrack, isTrackFavoritedByUser })(Player)
