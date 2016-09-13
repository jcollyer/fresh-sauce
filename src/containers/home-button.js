import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadAllTracks } from '../actions/tracklist'

class HomeButton extends Component {
  goHome() {
    this.props.router.push('/')
    this.props.loadAllTracks()
  }
  render() {
    return <button onClick={()=>this.goHome()}>Home</button>
  }
}

const mapStateToProps = (appState) => {
  return {
    genres: appState.genres
  }
}

export default withRouter(connect(mapStateToProps, { loadAllTracks })(HomeButton))
