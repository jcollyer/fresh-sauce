import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { setTrackDetail, setTrack } from '../actions/tracks'

class TrackDetail extends Component {
  componentDidMount(){
    let id = this.props.routeParams.id
    this.props.setTrackDetail(id)
  }
  render() {
    const { currentTrack } = this.props
    if (currentTrack.id) {
      return (
        <div>
          <h2>{currentTrack.title}</h2>
          <img src={currentTrack.artwork_url} onClick={() => this.props.setTrack(currentTrack)} />
        </div>
      )
    } else {
      return <i>hi there track detail page!</i>
    }
  }
}

const mapStateToProps = (appState) => {
  return {
    currentTrack: appState.tracks.currentTrack
  }
}

export default withRouter(connect(mapStateToProps, { setTrackDetail, setTrack })(TrackDetail))
