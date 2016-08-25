import React, { Component } from 'react'
import GenreSelect from './genre-select'
import Tracklist from '../containers/tracklist'

export default class Home extends Component {
  render() {
    return (
      <div id='home' className='container'>
        <GenreSelect />
        <Tracklist />
      </div>
    )
  }
}