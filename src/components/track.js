import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  // const { track, isFavoritedByUser, isAdmin } = props
  return (
    <div id='track'>
      <div onClick={props.onPlayTrackClicked}>
        <span className='artwork_url'><img src={props.track.artwork_url} /></span>
        <span className='title'>{props.track.title} </span>
        <span className='artist'><b>{props.track.artist}</b></span>
      </div>
      <p>favorited? <input type='checkbox' checked={ props.isFavoritedByUser} onClick={(event) => props.onToggleFavoriteTrackClicked(event)} /> </p>

      <Link to={`/tracks/${props.track.id}`}>{props.track.id}</Link>
      <button onClick={props.onDeleteTrackClicked} className={props.isAdmin ? '' : 'hide'}>Delete track</button>
    </div>
  )
}
