import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import { setTrackDetail } from '../actions/tracklist'
import { setTrack } from '../actions/tracklist'

class TrackDetail extends Component {
  componentDidMount(){
    let id = this.props.routeParams.id
    this.props.setTrackDetail(id)
  }
  render() {
    const { currentTrack } = this.props
    if (currentTrack.id) {
      return (
        <div id='user-detail' className='container'>
          <Link to={`/`}>Home</Link>
          <div className='artwork'>
            <img src={currentTrack.artwork_url_hires} onClick={() => this.props.setTrack(currentTrack)} />
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
