import React, { Component } from 'react'
import Genre from './genre'
import Tracklist from '../containers/tracklist'

export default class Home extends Component {
  render() {
    return (
      <div id='home' className='container'>
        <Genre />
        <Tracklist />
      </div>
    )
  }
}
