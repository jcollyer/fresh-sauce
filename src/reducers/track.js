import C from '../constants'
import initialState from '../api/initial-state'


export default (state = initialState.track, action) => {
  switch(action.type){
    case C.SET_TRACK:
      return Object.assign({}, state, {
        currentTrack: action.track,
        trackPlaying: action.trackPlaying,
        player: action.player
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
    case C.SET_TRACK_DETAIL_PAGE:
      return Object.assign({}, state, {
        currentTrack: action.trackDetail,
        trackPlaying: action.trackPlaying
      });
    default:
      return state;
  }
}
