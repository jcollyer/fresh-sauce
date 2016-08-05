import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setTrack, deleteTrack, toggleFavoriteTrack, isTrackFavoritedByUser } from '../actions/tracks'
import { startListeningToTracks } from '../actions/tracklist'
import { nextPage } from '../actions/tracklist'
import Track from '../components/track'
import AddTrack from './add-track'

class Tracklist extends Component {
  isUserAdmin() {
    if(this.props.user.username != 'guest' && this.props.user.role === 'admin'){
      return true
    }
    return false
  }
  isCurrentTrack(trackId){
    if(this.props.currentTrack.id === trackId){
      return true
    } else {
      return false
    }
  }
  isThisTrackPlaying(trackId) {
    if(this.props.currentTrack.id === trackId && this.props.trackPlaying){
      return true
    } else {
      return false
    }
  }
  getDocHeight() {
    let D = document
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight
    )
  }
  componentDidMount() {
    // load tracks
    if (!this.props.hasreceiveddata) {
      this.props.startListeningToTracks()
    }
    window.addEventListener('scroll', () => {
      if(window.scrollY + window.innerHeight > this.getDocHeight() - 100 && this.props.hasreceiveddata) {
        console.log('hit')
        this.props.nextPage()
      }
    })
  }
  render() {
    const { tracklist, hasreceiveddata, user, currentTrack, trackPlaying } = this.props
    const rows = tracklist.map((track, i) => {
      return <Track
        track={track}
        key={i}
        onPlayTrackClicked={() => this.props.setTrack(track)}
        onDeleteTrackClicked={() => this.props.deleteTrack(track)}
        onToggleFavoriteTrackClicked={() => this.props.toggleFavoriteTrack(track)}
        isFavoritedByUser={this.props.isTrackFavoritedByUser(track.id)}
        isAdmin={this.isUserAdmin()}
        isCurrentTrack={this.isCurrentTrack(track.id)}
        isThisTrackPlaying={this.isThisTrackPlaying(track.id)} />
    })//.reverse()

    return (
      <div id='tracklist' className='container'>
        <span className={this.isUserAdmin() ? '' : 'hide'}><AddTrack /></span>
        {hasreceiveddata ? rows : 'Loading tracks...'}
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    tracklist: appState.tracklist.tracks,
    hasreceiveddata: appState.tracklist.hasreceiveddata,
    user: appState.auth,
    currentTrack: appState.track.currentTrack,
    trackPlaying: appState.track.trackPlaying
  }
}

export default connect(mapStateToProps, { setTrack, deleteTrack, toggleFavoriteTrack, isTrackFavoritedByUser, nextPage, startListeningToTracks })(Tracklist)
