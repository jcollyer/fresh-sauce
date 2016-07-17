import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setTrack } from '../actions/tracks'
import Track from '../components/track'

class Tracklist extends Component {
  render() {
    const { tracks, hasreceiveddata, trackPlaying } = this.props
    const rows = tracks.map((track) => {
      return <Track track={track} key={track.id} onPlayTrackClicked={() => this.props.setTrack(track)} />
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
    tracks: appState.tracks.tracks,
    hasreceiveddata: appState.tracks.hasreceiveddata,
    trackPlaying: appState.tracks.trackPlaying,
    auth: appState.auth
  }
}

export default connect(mapStateToProps, {setTrack})(Tracklist)
