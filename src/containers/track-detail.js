import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class TrackDetail extends Component {
  render() {
    return <i>hi there track detail page!</i>
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

export default withRouter(connect(mapStateToProps)(TrackDetail))
