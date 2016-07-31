import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import { setTrackDetail, setTrack } from '../actions/tracks'

class TrackDetail extends Component {
  componentDidMount(){
    let id = this.props.routeParams.id
    this.props.setTrackDetail(id)
  }
  render() {
    const { currentTrack } = this.props
    let artwork_url_hires = ''
    if (currentTrack.artwork_url) {
      artwork_url_hires = currentTrack.artwork_url.replace('large','t300x300')
    }
    if (currentTrack.id) {
      return (
        <div id='user-detail' className='container'>
          <Link to={`/`}>Home</Link>
          <div className='artwork'>
            <img src={artwork_url_hires} onClick={() => this.props.setTrack(currentTrack)} />
          </div>
          <div className='info'>
            <h2>{currentTrack.title}</h2>
            <h3><span className='by'>by: </span>{currentTrack.artist}</h3>
            <h6></h6>
          </div>
        </div>
      )
    } else {
      return <i>hi there track detail page</i>
    }
  }
}

const mapStateToProps = (appState) => {
  return {
    currentTrack: appState.tracks.currentTrack
  }
}

export default withRouter(connect(mapStateToProps, { setTrackDetail, setTrack })(TrackDetail))
