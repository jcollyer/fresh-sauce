import { combineReducers } from 'redux'
import auth from './auth'
import tracks from './tracks'

const rootReducer = combineReducers({
  auth,
  tracks
})

export default rootReducer;
