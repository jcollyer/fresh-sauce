import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  // const { track, isFavoritedByUser, isAdmin } = props
  return (
    <div className='track-item'>
      <div className='track-item-info'>
        <span className='artwork_url' onClick={props.onPlayTrackClicked}><img src={props.track.artwork_url} /></span>
        <span className='title'>{props.track.title} </span>
        <span className='artist'><b>{props.track.artist}</b></span>
      </div>
      <div className='track-item-actions'>
        <i className="icon icon-heart"></i>
        <input type='checkbox' checked={ props.isFavoritedByUser} onClick={(event) => props.onToggleFavoriteTrackClicked(event)} />
        <Link to={`/tracks/${props.track.id}`}>{props.track.id}</Link>
        <button onClick={props.onDeleteTrackClicked} className={props.isAdmin ? '' : 'hide'}>Delete track</button>
      </div>
    </div>
  )
}
