import React, { Component } from 'react'
import GenreSelect from '../containers/genre-select'
import Tracklist from '../containers/tracklist'
import HomeButton from '../containers/home-button'

export default class GenrePage extends Component {
  render() {
    return (
      <div id='genre' className='container'>
        <GenreSelect />
        <HomeButton />
        <h1>genre!</h1>
        <Tracklist />
      </div>
    )
  }
}
