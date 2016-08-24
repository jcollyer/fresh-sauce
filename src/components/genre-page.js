import React, { Component } from 'react'
import Tracklist from '../containers/tracklist'

export default class GenrePage extends Component {
  render() {
    return (
      <div id='genre' className='container'>
        <Tracklist />
      </div>
    )
  }
}
