import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setTrack, deleteTrack, favoriteTrack, unFavoriteTrack } from '../actions/tracks'
import Track from '../components/track'

class Tracklist extends Component {
  isTrackFavoritedByUser(trackId){
    let userFavorites = this.props.userFavorites;
    // make sure user favorites is not an empty object
    if(Object.keys(userFavorites).length > 0){
      let userFavArray = []
      for(let fav in userFavorites) {
        userFavArray.push(fav)
      }
      return userFavArray.indexOf(trackId) > -1
    }
  }
  render() {
    const { tracklist, hasreceiveddata, trackPlaying, userFavorites } = this.props
    const rows = tracklist.map((track, i) => {
      return <Track
        track={track}
        key={i}
        onPlayTrackClicked={() => this.props.setTrack(track)}
        onDeleteTrackClicked={() => this.props.deleteTrack(track)}
        onFavoriteTrackClicked={() => this.props.favoriteTrack(track)}
        onUnFavoriteTrackClicked={() => this.props.unFavoriteTrack(track)}
        isFavoritedByUser={this.isTrackFavoritedByUser(track.id)} />
    }).reverse()

    return (
      <div id="tracklist" className={trackPlaying ? "player-padding" : ""}>
        {hasreceiveddata ? rows : "Loading tracks..."}
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    tracklist: appState.tracklist.tracks,
    hasreceiveddata: appState.tracklist.hasreceiveddata,
    trackPlaying: appState.tracks.trackPlaying,
    userFavorites: appState.auth.favorites || {}
  }
}

export default connect(mapStateToProps, { setTrack, deleteTrack, favoriteTrack, unFavoriteTrack })(Tracklist)
