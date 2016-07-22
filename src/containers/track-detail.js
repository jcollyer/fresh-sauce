import React, { Component } from 'react'
import { connect } from 'react-redux'

class TrackDetail extends Component {
  render() {
    return (
      <div>
        hi there track detail page!
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

export default connect(mapStateToProps)(TrackDetail)
