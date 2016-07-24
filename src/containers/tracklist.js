import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setTrack, deleteTrack, favoriteTrack } from '../actions/tracks'
import Track from '../components/track'

class Tracklist extends Component {
  render() {
    const { tracklist, hasreceiveddata, trackPlaying } = this.props
    const rows = tracklist.map((track) => {
      return <Track
        track={track}
        key={track.id}
        onPlayTrackClicked={() => this.props.setTrack(track)}
        onDeleteTrackClicked={() => this.props.deleteTrack(track)}
        onFavoriteTrackClicked={() => this.props.favoriteTrack(track)} />
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
    auth: appState.auth
  }
}

export default connect(mapStateToProps, { setTrack, deleteTrack, favoriteTrack })(Tracklist)
