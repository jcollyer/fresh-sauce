import React from 'react'
import { Link } from 'react-router'

export default (props) => {

  //set player track artist depending if its a SC or YT track
  var trackArtist = ''
  props.track && props.track.kind === 'sc' ? trackArtist = props.track.artist : trackArtist = props.track.tag_list[0]

  return (
    <div className='track-item'>
      <div className='track-item-info'>
        <div className='track-item-info-artwork' onClick={props.onPlayTrackClicked}>
          <i className='icon icon-play'></i>
          <img src={props.track.artwork_url} />
        </div>
        <div className='track-item-info-detail' onClick={props.onPlayTrackClicked}>
          <h3 className='title elipsis'>{props.track.title}</h3>
          <p className='artist'>by: {props.track.artist}{trackArtist}</p>
        </div>
      </div>
      <div className='track-item-actions'>
        <i className={props.isFavoritedByUser ? 'icon icon-heart' : 'icon icon-heart-outlined'} onClick={props.onToggleFavoriteTrackClicked}></i>
        <Link to={`/tracks/${props.track.id}`}><i className='icon icon-arrow-right'></i></Link>
        <button onClick={props.onDeleteTrackClicked} className={props.isAdmin ? '' : 'hide'}>Delete track</button>
      </div>
    </div>
  )
}
