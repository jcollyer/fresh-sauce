import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  const { track } = props

  return (
    <div id="track">
      <div onClick={props.onPlayTrackClicked}>
        <span className="artwork_url"><img src={track.artwork_url} /></span>
        <span className="title">{track.title} </span>
        <span className="artist"><b>{track.artist}</b></span>
      </div>

      <Link to={`/tracks/${track.id}`}>{track.id}</Link>
      <button onClick={props.onDeleteTrackClicked}>Delete track</button>
      <button onClick={props.onFavoriteTrackClicked}>Favorite track</button>
    </div>
  )
}
