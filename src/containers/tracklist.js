import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setTrack, deleteTrack, toggleFavoriteTrack } from '../actions/tracks'
import Track from '../components/track'

class Tracklist extends Component {
  isTrackFavoritedByUser(trackId){
    if(this.props.user.username != 'guest'){
      let userFavorites = this.props.user.favorites;
      // make sure user favorites is not an empty object
      if(Object.keys(userFavorites).length > 0){
        let userFavArray = []
        for(let fav in userFavorites) {
          userFavArray.push(fav)
        }
        return userFavArray.indexOf(trackId) > -1
      }
    }
  }
  render() {
    const { tracklist, hasreceiveddata, trackPlaying, user } = this.props
    const rows = tracklist.map((track, i) => {
      return <Track
        track={track}
        key={i}
        onPlayTrackClicked={() => this.props.setTrack(track)}
        onDeleteTrackClicked={() => this.props.deleteTrack(track)}
        onToggleFavoriteTrackClicked={(event) => this.props.toggleFavoriteTrack(event, track)}
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
    user: appState.auth
  }
}

export default connect(mapStateToProps, { setTrack, deleteTrack, toggleFavoriteTrack })(Tracklist)
