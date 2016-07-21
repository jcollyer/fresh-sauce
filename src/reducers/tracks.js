import C from '../constants'
import initialState from '../api/initial-state'
import { YTDurationToSeconds } from '../utils'

export default (state = initialState.tracks, action) => {
  switch(action.type){
    case C.SET_TRACK:
      if(typeof(action.track.duration) === "string") { //if track format is YoutTube. Example: "PT5M20S"
        var duration = action.track.kind === "sc" ? action.track.duration : YTDurationToSeconds(action.track.duration)
        action.track.duration = duration;
      }
      return Object.assign({}, state, {
        currentTrack: action.track,
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
