import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import { setTrack, deleteTrack, toggleFavoriteTrack, isTrackFavoritedByUser } from '../actions/track'
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
    console.log(track.id)
    console.log(this.props.currentTrack)
    if(this.props.currentTrack && this.props.currentTrack.id === track.id && this.props.trackPlaying){
      return true
    } else {
      return false
    }
  }
  render() {
    const { user, favorites } = this.props
    const favs = Object.keys(favorites).map((track, i) => {
      return <Track
      track={favorites[track]}
      key={i}
      onPlayTrackClicked={() => this.props.setTrack(favorites[track])}
      onDeleteTrackClicked={() => this.props.deleteTrack(favorites[track])}
      onToggleFavoriteTrackClicked={() => this.props.toggleFavoriteTrack(favorites[track])}
      isFavoritedByUser={this.props.isTrackFavoritedByUser(favorites[track].id)}
      isAdmin={this.isUserAdmin()}
      isCurrentTrack={this.isCurrentTrack(favorites[track])}
      isThisTrackPlaying={this.isThisTrackPlaying(favorites[track])} />
    })
    return (
      <div id='user-detail'>
        <h3>hi, {user.username}</h3>
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

export default withRouter(connect(mapStateToProps, { setTrack, deleteTrack, toggleFavoriteTrack, isTrackFavoritedByUser })(UserDetail))
