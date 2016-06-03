import C from '../../constants'
import initialState from '../initial-state'
import _ from 'lodash'

export default (state = initialState.tracks, action) => {

	switch(action.type){
		case C.RECEIVE_TRACKS_DATA:
			return Object.assign({}, state, {
				hasreceiveddata: true,
				tracks: action.tracks
			});
		case C.SET_TRACK:
			// debugger;

			return Object.assign({}, state, {
				currentTrack: action.track
			});
		default:
			return state;
	}
}
