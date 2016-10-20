import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import { togglePlayTrack, deleteTrack, toggleFavoriteTrack, isTrackFavoritedByUser } from '../actions/track'
import { loadAllTracks } from '../actions/tracklist'
import Track from '../components/track'

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
  goHome() {
    this.props.router.push('/')
    this.props.loadAllTracks()
  }
  render() {
    const { user, favorites } = this.props
    const favs = Object.keys(favorites).map((track, i) => {
      return <Track
      track={favorites[track]}
      key={i}
      onPlayTrackClicked={() => this.props.togglePlayTrack(favorites[track])}
      onDeleteTrackClicked={() => this.props.deleteTrack(favorites[track])}
      onToggleFavoriteTrackClicked={() => this.props.toggleFavoriteTrack(favorites[track])}
      isFavoritedByUser={this.props.isTrackFavoritedByUser(favorites[track].id)}
      isAdmin={this.isUserAdmin()}
      isCurrentTrack={this.isCurrentTrack(favorites[track])}
      isThisTrackPlaying={this.isThisTrackPlaying(favorites[track])} />
    })
    return (
      <div id='user-detail' className='container'>
        <h3>hi, {user.username}</h3>
        <button onClick={()=>this.goHome()}>Home</button>
        <div id='tracklist'>
          {Object.keys(favorites).length > 0 ? favs : 'Loading tracks...'}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    favorites: appState.auth.favorites,
    user: appState.auth,
    currentTrack: appState.track.currentTrack,
    trackPlaying: appState.track.trackPlaying
  }
}

export default withRouter(connect(mapStateToProps, { togglePlayTrack, deleteTrack, toggleFavoriteTrack, isTrackFavoritedByUser, loadAllTracks })(UserDetail))
