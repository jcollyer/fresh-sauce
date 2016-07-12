import C from '../constants'
import initialState from '../api/initial-state'

export default (state = initialState.tracks, action) => {

  switch(action.type){
    case C.RECEIVE_TRACKS_DATA:
      return Object.assign({}, state, {
        hasreceiveddata: true,
        tracks: action.tracks
      });
    case C.SET_TRACK:
      return Object.assign({}, state, {
        currentTrack: action.track,
        player: action.player,
        trackPlaying: action.trackPlaying
      });
    case C.SET_TRACK_POSITION:
      let trackPercentage = 100 * (action.trackPosition / state.currentTrack.duration)
      return Object.assign({}, state, {
        trackPosition: action.trackPosition,
        trackPercentage: trackPercentage
      });
    case C.STOP_TRACK:
      return Object.assign({}, state, {
        trackPlaying: false
      });
    default:
      return state;
  }
}
