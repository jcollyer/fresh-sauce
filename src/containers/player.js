import React, { Component } from 'react'
import ReactRedux, { connect } from 'react-redux'
import C from '../constants'
import { setTrackPosition, stopTrack, playNextTrack, playToggleTrack, toggleFavoriteTrack, isTrackFavoritedByUser } from '../actions/tracks'
import { toggleShuffleTracks } from '../actions/tracklist'
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
  componentDidMount(){
    document.addEventListener('keydown', (e) => {
      console.log(e.keyCode)
      switch (e.keyCode) {
        case 32:
          e.preventDefault()
          this.props.playToggleTrack(playingTrackInterval)
          break;
        case 37:
          this.props.playNextTrack('prev')
          break;
        case 39:
          this.props.playNextTrack('next')
          break;
        }
    }, false);
  }
  render() {
    const { track, trackPlaying, shuffle, trackPosition, trackPercentage, players } = this.props
    const src = 'https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F' + track.id + '&show_artwork=true';
    if (trackPlaying && track.id != oldTrackId) { // if track is playing, with a new track ID
      playTrack(track, players)
      this.whileTrackPlaying(players)
      oldTrackId = track.id
    }
    return (
        <div id='player'>
          <iframe id='soundcloud_widget' width='100%' height='166' scrolling='no' frameBorder='no' src={src} className='offscreen'></iframe>

          <div id='player-track-artwork'>
            <div id='yt_widget' className={track.kind === 'yt' && trackPlaying === true ? '' : 'offscreen'}></div>
            <div id='yt-thumb' className={track.kind === 'sc' ? 'hide' : ''}>
              <img src={track.artwork_url} className={trackPlaying === true ? 'hide' : ''} />
            </div>
            <img
              src={track.artwork_url}
              className={track.kind === 'sc' ? '' : 'hide'}
              onClick={() => this.toggleSCTrack(players.playerSC)} />
          </div>

          <div id='player-track-info'>
            <TrackProgress progressPercentage={trackPercentage} duration={track.duration} trackProgressClick={(position) => this.trackProgressClick(position, players)} />
            <h3 className='elipsis'>{track.title}</h3>
            <h4><span id='by'>by:</span> {track.artist} </h4>
            <div id='player-track-time'>{this.convertToPrettyTime(trackPosition)}/{this.convertToPrettyTime(track.duration)}</div>
            <div id='player-track-controls'>
              <i onClick={() => this.props.toggleFavoriteTrack(track)} className={this.props.isTrackFavoritedByUser(track.id) ? 'icon icon-heart-fill active' : 'icon icon-heart'}></i>
              <i onClick={() => this.props.playNextTrack('prev')} className='icon icon-previous'></i>
              <i onClick={() => this.props.playToggleTrack(playingTrackInterval)} className={trackPlaying ? 'icon icon-pause' : 'icon icon-play'}></i>
              <i onClick={() => this.props.playNextTrack('next')} className='icon icon-next'></i>
              <i onClick={() => this.props.toggleShuffleTracks()} className={shuffle ? 'icon icon-shuffle-fill active' : 'icon icon-shuffle'}></i>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    track: appState.track.currentTrack,
    trackPlaying: appState.track.trackPlaying,
    trackPosition: appState.track.trackPosition,
    trackPercentage: appState.track.trackPercentage,
    shuffle: appState.tracklist.shuffle,
    players: appState.players.playerOptions
  }
}

export default connect(mapStateToProps,  { setTrackPosition, stopTrack, playNextTrack, playToggleTrack, toggleFavoriteTrack, isTrackFavoritedByUser, toggleShuffleTracks })(Player)
