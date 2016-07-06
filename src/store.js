import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'
import initialState from './api/initial-state'
import ReduxThunk from 'redux-thunk'


// A super-simple logger
const logger = store => next => action => {
  console.log('dispatching', action.type,action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

module.exports = applyMiddleware(ReduxThunk)(createStore)(rootReducer,initialState);
