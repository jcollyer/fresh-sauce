import C from '../constants'
import initialState from '../api/initial-state'

export default (state = initialState.players, action) => {
  switch(action.type){
    case C.SET_PLAYERS:
      return Object.assign({}, state, {
        playerOptions: action.playerOptions
      });
    default:
      return state;
  }
}
