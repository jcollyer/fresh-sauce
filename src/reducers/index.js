import { combineReducers } from 'redux'
import auth from './auth'
import track from './track'
import tracklist from './tracklist'
import players from './players'
import genres from './genres'

const rootReducer = combineReducers({
  auth,
  track,
  tracklist,
  players,
  genres
})

export default rootReducer;
