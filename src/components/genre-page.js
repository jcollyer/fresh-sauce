import React, { Component } from 'react'
import GenreSelect from './genre-select'
import Tracklist from '../containers/tracklist'

export default class GenrePage extends Component {
  render() {
    return (
      <div id='genre' className='container'>
        <GenreSelect />
        <h1>genre!</h1>
        <Tracklist />
      </div>
    )
  }
}
