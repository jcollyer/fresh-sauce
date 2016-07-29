import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import { setTrack, deleteTrack, toggleFavoriteTrack, isTrackFavoritedByUser } from '../actions/tracks'
import Track from '../components/track'

class UserDetail extends Component {
  isUserAdmin() {
    if(this.props.user.username != 'guest' && this.props.user.role === 'admin'){
      return true
    }
    return false
  }
  render() {
    const { user, favorites } = this.props
    const favs = Object.keys(favorites).map((track, i) => {
      console.log(favorites[track].id)
      return <Track
      track={favorites[track]}
      key={i}
      onPlayTrackClicked={() => this.props.setTrack(favorites[track])}
      onDeleteTrackClicked={() => this.props.deleteTrack(favorites[track])}
      onToggleFavoriteTrackClicked={() => this.props.toggleFavoriteTrack(favorites[track])}
      isFavoritedByUser={this.props.isTrackFavoritedByUser(favorites[track].id)}
      isAdmin={this.isUserAdmin()} />
    })
    return (
      <div id='user-detail'>
        <h3>hi, {user.username}</h3>
        {Object.keys(favorites).length > 0 ? favs : 'Loading tracks...'}
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    favorites: appState.auth.favorites,
    user: appState.auth
  }
}

export default withRouter(connect(mapStateToProps, { setTrack, deleteTrack, toggleFavoriteTrack, isTrackFavoritedByUser })(UserDetail))
