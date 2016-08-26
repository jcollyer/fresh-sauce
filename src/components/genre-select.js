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
    const { genres } = this.props
    const genreButtons = this.props.genres.map((genre)=>{
      return (
        <button onClick={(e) => this.setGenre(e)} name={genre.genre}>{genre.name}</button>
      )
    })
    return (
      <div id='genre'>
        { genreButtons }
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    genres: appState.genres
  }
}

export default withRouter(connect(mapStateToProps, { loadTracksByGenre })(GenreSelect))
