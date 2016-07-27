import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setTrack, deleteTrack, toggleFavoriteTrack, isTrackFavoritedByUser } from '../actions/tracks'
import Track from '../components/track'
import AddTrack from './add-track'

class Tracklist extends Component {
  isUserAdmin() {
    if(this.props.user.username != 'guest' && this.props.user.role === 'admin'){
      return true
    }
    return false
  }
  render() {
    const { tracklist, hasreceiveddata, user } = this.props
    const rows = tracklist.map((track, i) => {
      return <Track
        track={track}
        key={i}
        onPlayTrackClicked={() => this.props.setTrack(track)}
        onDeleteTrackClicked={() => this.props.deleteTrack(track)}
        onToggleFavoriteTrackClicked={() => this.props.toggleFavoriteTrack(track.id)}
        isFavoritedByUser={this.props.isTrackFavoritedByUser(track.id)}
        isAdmin={this.isUserAdmin()} />
    })//.reverse()

    return (
      <div id='tracklist'>
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
    user: appState.auth
  }
}

export default connect(mapStateToProps, { setTrack, deleteTrack, toggleFavoriteTrack, isTrackFavoritedByUser })(Tracklist)
