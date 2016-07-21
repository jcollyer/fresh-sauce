import { combineReducers } from 'redux'
import auth from './auth'
import tracks from './tracks'
import tracklist from './tracklist'
import players from './players'

const rootReducer = combineReducers({
  auth,
  tracks,
  tracklist,
  players
})

export default rootReducer;
