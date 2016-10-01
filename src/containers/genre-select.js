import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadTracksByGenre, nextPage } from '../actions/tracklist'

class GenreSelect extends Component {
  setGenre(e) {

    const genre = e.target.classList[0].substr(5).toLowerCase();
    this.props.router.push('/genre/'+genre)
    this.props.loadTracksByGenre(genre)
  }
  render() {
    const { genres } = this.props
    const genreButtons = this.props.genres.map((genre, i)=>{
      return (
        <button key={i} onClick={(e) => this.setGenre(e)} name={genre.genre} className="genrebutton">
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
    genres: appState.genres
  }
}

export default withRouter(connect(mapStateToProps, { loadTracksByGenre })(GenreSelect))
