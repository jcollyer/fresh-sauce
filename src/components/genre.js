import React, { Component } from 'react'

export default class Genre extends Component {
  setGenre(e) {
    debugger;
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
