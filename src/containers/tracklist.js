import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setTrack } from '../actions/tracks'
import Track from '../components/track'

class Tracklist extends Component {
  render() {
    const { tracks, hasreceiveddata, player } = this.props
    const rows = tracks.map((track) => {
      return <Track track={track} key={track.id} onPlayTrackClicked={() => this.props.setTrack(track, player)} />
    }).reverse()

    return (
      <div id="tracklist" className={player ? "player-padding" : ""}>
        {hasreceiveddata ? rows : "Loading tracks..."}
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    tracks: appState.tracks.tracks,
    hasreceiveddata: appState.tracks.hasreceiveddata,
    auth: appState.auth,
    player: appState.tracks.player
  }
}

export default connect(mapStateToProps, {setTrack})(Tracklist)
