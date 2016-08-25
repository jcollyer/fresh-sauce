import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadTracksByGenre, nextPage } from '../actions/tracklist'

class GenreSelect extends Component {
  setGenre(e) {
    let genre = e.target.name
    this.props.loadTracksByGenre(genre)
    this.props.router.push('/genre/'+genre)
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

export default withRouter(connect(mapStateToProps, { loadTracksByGenre })(GenreSelect))
