import React from 'react'

export default (props) => {
  const { track } = props

  return (
    <div className="track" onClick={props.onPlayTrackClicked}>
      <span className="artwork_url"><img src={track.artwork_url} /></span>
      <span className="title">{track.title} </span>
      <span className="artist"><b>{track.artist}</b></span>
      <button onClick={props.onDeleteTrackClicked}>Delete track</button>
    </div>
  )
}
