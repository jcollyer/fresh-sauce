import C from '../constants'
import initialState from '../api/initial-state'

export default (state = initialState.auth, action) => {
  switch(action.type) {
    case C.ATTEMPTING_LOGIN:
      return {
        currently: C.AWAITING_AUTH_RESPONSE,
        username: "guest",
        uid: null
      };
    case C.LOGOUT:
      return {
        currently: C.ANONYMOUS,
        username: "guest",
        uid: null
      };
    case C.LOGIN_USER:
      return {
        currently: C.LOGGED_IN,
        username: action.username,
        uid: action.uid
      };
    default: return state;
  }
};
