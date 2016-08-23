import React, { Component } from 'react'
import { loadTracksByGenre, nextPage } from '../actions/tracklist'

export default class Genre extends Component {
  setGenre(e) {
    let name = e.target.name
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
