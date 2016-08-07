import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import { setTrackDetailPage } from '../actions/tracklist'
import { setTrack } from '../actions/tracklist'

class TrackDetail extends Component {
  componentDidMount(){
    let id = this.props.routeParams.id
    this.props.setTrackDetailPage(id)
  }
  render() {
    const { currentTrack } = this.props
    if (currentTrack.id) {
      return (
        <div id='track-detail' className='container'>
          <div id='track-detail-header'>
            <Link to={`/`}>Home</Link>
          </div>
          <div id='track-detail-artwork'>
            <img src={currentTrack.artwork_url_hires} />
          </div>
          <div id='track-detail-info'>
            <h2>{currentTrack.title}</h2>
            <h3><span className='by'>by: </span>{currentTrack.artist}</h3>
            <a className='origin-link' href={currentTrack.permalink } target='_blank'>
              <span>{currentTrack.linkTitle}</span>
              <i className={currentTrack.linkIcon}></i>
            </a>
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
    currentTrack: appState.track.currentTrack
  }
}

export default withRouter(connect(mapStateToProps, { setTrackDetailPage, setTrack })(TrackDetail))
