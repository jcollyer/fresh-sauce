import C from '../constants'
import initialState from '../api/initial-state'

export default (state = initialState.tracklist, action) => {
  switch(action.type){
    case C.RECEIVE_TRACKS_DATA:
      return Object.assign({}, state, {
        hasreceiveddata: true,
        tracks: action.tracks
      });
      default:
        return state;
  }
}
