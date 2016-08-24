import C from '../constants'
import initialState from '../api/initial-state'

export default (state = initialState.tracklist, action) => {
  switch(action.type){
    case C.RECEIVE_TRACKS_DATA:
      return Object.assign({}, state, {
        tracks: action.replace ? action.tracks : state.tracks.concat(action.tracks),
        hasreceiveddata: action.hasreceiveddata,
        shuffle: action.shuffle,
        genre: action.genre
      });
      default:
        return state;
  }
}
