import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import { togglePlayTrack, deleteTrack, toggleFeatueTrack, toggleFavoriteTrack, isTrackFavoritedByUser } from '../actions/track'
import { nextPage, loadAllTracks } from '../actions/tracklist'
import Track from '../components/track'
import AddTrack from '../components/add-track'

class UserDetail extends Component {
  isUserAdmin() {
    if(this.props.user.username != 'guest' && this.props.user.role === 'admin'){
      return true
    }
    return false
  }
  isCurrentTrack(track){
    if(this.props.currentTrack && this.props.currentTrack.id === track.id){
      return true
    } else {
      return false
    }
  }
  isThisTrackPlaying(track) {
    if(this.props.currentTrack && this.props.currentTrack.id === track.id && this.props.trackPlaying){
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
      this.props.loadAllTracks()
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
        onPlayTrackClicked={() => this.props.togglePlayTrack(track)}
        onDeleteTrackClicked={() => this.props.deleteTrack(track)}
        onToggleFeatureTrackClicked={() => this.props.toggleFeatueTrack(track)}
        onToggleFavoriteTrackClicked={() => this.props.toggleFavoriteTrack(track)}
        isFavoritedByUser={this.props.isTrackFavoritedByUser(track.id)}
        isAdmin={this.isUserAdmin()}
        isCurrentTrack={this.isCurrentTrack(track)}
        isThisTrackPlaying={this.isThisTrackPlaying(track)} />
      })

    return (
      <div id='user-detail' className='container'>
        <span className={this.isUserAdmin() ? '' : 'hide'}><AddTrack /></span>
        <h3>hi, {user.username}</h3>
        <div id='tracklist'>
          {hasreceiveddata ? rows : 'Loading tracks...'}
        </div>
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

export default withRouter(connect(mapStateToProps, { togglePlayTrack, deleteTrack, toggleFeatueTrack, toggleFavoriteTrack, isTrackFavoritedByUser, nextPage, loadAllTracks })(UserDetail))
