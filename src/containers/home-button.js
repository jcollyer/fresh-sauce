import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { startListeningToTracks } from '../actions/tracklist'

class HomeButton extends Component {
  goHome() {
    this.props.router.push('/')
    this.props.startListeningToTracks('')
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

export default withRouter(connect(mapStateToProps, { startListeningToTracks })(HomeButton))
