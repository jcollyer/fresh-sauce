import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTracksByGenre, nextPage } from '../actions/tracklist'

class GenreSelect extends Component {
  setGenre(e) {
    let genre = e.target.name
    this.props.loadTracksByGenre(genre)
  }
  render() {
    return (
      <div id='genre'>
        <button onClick={(e) => this.setGenre(e)} name='hip-hop'>Hip-Hop</button>
        <button onClick={(e) => this.setGenre(e)} name='house'>House</button>
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    track: appState.track.currentTrack
  }
}

export default connect(mapStateToProps, { loadTracksByGenre })(GenreSelect)
