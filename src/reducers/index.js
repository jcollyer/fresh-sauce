import { combineReducers } from 'redux'
import auth from './auth'
import tracks from './tracks'
import players from './players'

const rootReducer = combineReducers({
  auth,
  tracks,
  players
})

export default rootReducer;
