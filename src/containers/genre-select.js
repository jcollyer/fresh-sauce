import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadTracksByGenre, nextPage } from '../actions/tracklist'

class GenreSelect extends Component {
  setGenre(genre) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.props.router.push('/genre/'+genre)
    this.props.loadTracksByGenre(genre)
  }
  render() {
    const { genres, currentGenre } = this.props
    const genreButtons = this.props.genres.map((genre, i)=>{
      return (
        <button key={i} onClick={() => this.setGenre(genre.genre)} name={genre.genre} className={currentGenre == genre.genre ? "active genrebutton" : "genrebutton"}>
          <i className={"icon-"+ genre.name}></i>
          <p>{genre.name}</p>
        </button>
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
    genres: appState.genres,
    currentGenre: appState.tracklist.genre
  }
}

export default withRouter(connect(mapStateToProps, { loadTracksByGenre })(GenreSelect))
