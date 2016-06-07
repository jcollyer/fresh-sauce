import React, { Component } from 'react'
import { connect } from 'react-redux'
import C from '../constants'
import { setTrack } from '../actions/tracks'
import Track from '../components/track'
import store from '../store'

class Trackslist extends Component {
 	render() {
   	const { tracks, hasreceiveddata } = this.props
 		const rows = tracks.map((track) => {
		 	return <Track track={track} key={track.id} onPlayTrackClicked={() => this.props.setTrack(track)} />
		 })

		return (
 	 		<div className="trackslist">
 				{hasreceiveddata ? rows : "Loading tracks..."}
			</div>
		)
	}
}

const mapStateToProps = (appState) => {
	return {
		tracks: appState.tracks.tracks,
		hasreceiveddata: appState.tracks.hasreceiveddata,
		auth: appState.auth
	}
}

export default connect(mapStateToProps, {setTrack})(Trackslist)
