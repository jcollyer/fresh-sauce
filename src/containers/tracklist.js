import React, { Component } from 'react'
import { connect } from 'react-redux'
import { togglePlayTrack, toggleFavoriteTrack, isTrackFavoritedByUser } from '../actions/track'
import { loadAllTracks, loadTracksByGenre } from '../actions/tracklist'
import { nextPage } from '../actions/tracklist'
import Track from '../components/track'

class Tracklist extends Component {
  isCurrentTrack(trackId){
    if(this.props.currentTrack.id === trackId){
      return true
    } else {
      return false
    }
  }
  isThisTrackPlaying(trackId) {
    if(this.props.currentTrack.id === trackId && this.props.trackPlaying){
      return true
    } else {
      return false
    }
  }
  getDocHeight() {
    let D = document
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight
    )
  }
  componentDidMount() {
    // load tracks
    if (!this.props.hasreceiveddata) {
      if (this.props.genre) {
        this.props.loadTracksByGenre(this.props.genre)
      } else {
        this.props.loadAllTracks()
      }
    }

    window.addEventListener('scroll', () => {
      if(window.scrollY + window.innerHeight > this.getDocHeight() - 100 && this.props.hasreceiveddata) {
        console.log('window scroll: this.props.tracklist.length - ', this.props.tracklist.length)
        this.props.nextPage()
      }
    })
  }
  render() {
    const { tracklist, hasreceiveddata, user, currentTrack, trackPlaying } = this.props
    const rows = tracklist.map((track, i) => {
      return <Track
        track={track}
        key={i}
        onPlayTrackClicked={() => this.props.togglePlayTrack(track)}
        onToggleFavoriteTrackClicked={() => this.props.toggleFavoriteTrack(track)}
        isFavoritedByUser={this.props.isTrackFavoritedByUser(track.id)}
        isCurrentTrack={this.isCurrentTrack(track.id)}
        isThisTrackPlaying={this.isThisTrackPlaying(track.id)} />
    })

    return (
      <div id='tracklist'>
        {hasreceiveddata ? rows : 'Loading tracks...'}
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    tracklist: appState.tracklist.tracks,
    hasreceiveddata: appState.tracklist.hasreceiveddata,
    user: appState.auth,
    currentTrack: appState.track.currentTrack,
    trackPlaying: appState.track.trackPlaying
  }
}

export default connect(mapStateToProps, { togglePlayTrack, toggleFavoriteTrack, isTrackFavoritedByUser, nextPage, loadAllTracks, loadTracksByGenre })(Tracklist)
