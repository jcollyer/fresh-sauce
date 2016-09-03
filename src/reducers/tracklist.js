import C from '../constants'
import initialState from '../api/initial-state'

export default (state = initialState.tracklist, action) => {
  switch(action.type){
    case C.RECEIVE_TRACKS_DATA:
      let allTracks = action.replace ? action.allTracks : state.allTracks.concat(action.allTracks)
      let tracks = action.replace ? action.tracks : state.tracks.concat(action.tracks)
      // console.log('tracks - ', tracks, 'allTracks -', allTracks)

      return Object.assign({}, state, {
        allTracks: allTracks,
        tracks: tracks,
        hasreceiveddata: action.hasreceiveddata,
        shuffle: action.shuffle,
        genre: action.genre
      });
      default:
        return state;
  }
}
