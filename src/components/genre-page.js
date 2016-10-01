import React, { Component } from 'react'
import { connect } from 'react-redux'
import GenreSelect from '../containers/genre-select'
import Tracklist from '../containers/tracklist'
import HomeButton from '../containers/home-button'

class GenrePage extends Component {
  render() {
    return (
      <div id='genre-page' className='container'>
        <GenreSelect />
        <HomeButton />
        <h5>genre: {this.props.genre}</h5>
        <Tracklist genre={this.props.genre} />
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    genre: appState.tracklist.genre
  }
}

export default connect(mapStateToProps)(GenrePage)
