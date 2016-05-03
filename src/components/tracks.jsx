import React from 'react'
import { connect } from 'react-redux'

const Tracks = ({tracks}) => (
  <div>
    <h1>Tracks</h1>
    {tracks.map(track => <p key={track}>{track}</p>)}
  </div>
)

function mapStateToProps(tracks) {
  return {
    tracks
  }
}

export default connect(mapStateToProps)(Tracks)
