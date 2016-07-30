import React from 'react'
import { Link } from 'react-router'

export default (props) => {

  //set player track artist depending if its a SC or YT track
  var trackArtist = ''
  props.track && props.track.kind === 'sc' ? trackArtist = props.track.artist : trackArtist = props.track.tag_list[0]

  return (
    <div className={props.isCurrentTrack ? 'track-item active' : 'track-item'}>
      <div className='track-item-info'>
        <div className='track-item-info-artwork' onClick={props.onPlayTrackClicked}>
          <i className={props.isThisTrackPlaying ? 'icon icon-pause' : 'icon icon-play'}></i>
          <img src={props.track.artwork_url} />
        </div>
        <div className='track-item-info-detail'>
          <h3 className='title elipsis'>{props.track.title}</h3>
          <p className='artist'><span className='track-by'>by:</span>{props.track.artist}{trackArtist}</p>
        </div>
      </div>
      <div className='track-item-actions'>
        <i className={props.isFavoritedByUser ? 'track-heart icon icon-heart' : 'track-heart icon icon-heart-outline'} onClick={props.onToggleFavoriteTrackClicked}></i>
        <Link className='go-to-track-detail' to={`/tracks/${props.track.id}`}><div className='icon icon-arrow-right'></div></Link>
        <button onClick={props.onDeleteTrackClicked} className={props.isAdmin ? '' : 'hide'}>Delete track</button>
      </div>
    </div>
  )
}
