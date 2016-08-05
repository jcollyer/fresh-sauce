import { combineReducers } from 'redux'
import auth from './auth'
import track from './track'
import tracklist from './tracklist'
import players from './players'

const rootReducer = combineReducers({
  auth,
  track,
  tracklist,
  players
})

export default rootReducer;
