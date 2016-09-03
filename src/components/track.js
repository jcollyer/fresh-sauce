import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  return (
    <div className={props.isCurrentTrack ? 'track-item active' : 'track-item'}>
      <div className='track-item-info'>
        <div className='track-item-info-artwork' onClick={props.onPlayTrackClicked}>
          <i className={props.isThisTrackPlaying ? 'icon icon-pause' : 'icon icon-play'}></i>
          <img src={props.track.artwork_url} />
        </div>
        <div className='track-item-info-detail'>
          <h3 className='title elipsis'>{props.track.title}</h3>
          {props.track.genre}
          <p className='artist'><span className='track-by'>by: </span>{props.track.artist}</p>
          <a className='origin-link' href={props.track.permalink} target='_blank'>
            <span>{props.track.linkTitle}</span>
            <i className={props.track.linkIcon}></i>
          </a>
          <i className={props.track.featured ? 'icon icon-heart' : 'hide'} ></i>
        </div>
      </div>
      <div className='track-item-actions'>
        <i className={props.isFavoritedByUser ? 'track-heart icon icon-heart-fill' : 'track-heart icon icon-heart'} onClick={props.onToggleFavoriteTrackClicked}></i>
        <Link className='go-to-track-detail' to={`/tracks/${props.track.id}`}><div className='icon icon-goto'></div></Link>
        <button onClick={props.onDeleteTrackClicked} className={props.isAdmin ? '' : 'hide'}>Delete track</button>
        <div className={props.isAdmin ? '' : 'hide'}>
          <input type='checkbox' onChange={props.onToggleFeatureTrackClicked} checked={props.track.featured} />Feature track?
        </div>
      </div>
    </div>
  )
}
