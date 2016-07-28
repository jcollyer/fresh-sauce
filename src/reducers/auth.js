import C from '../constants';

// const initialState = { username: null, uid: null, status: C.AUTH_ANONYMOUS };
import initialState from '../api/initial-state'

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case C.AUTH_OPEN:
      return {
        status: C.AUTH_AWAITING_RESPONSE,
        username: 'guest',
        uid: null
      };
    case C.AUTH_LOGIN:
      return {
        status: C.AUTH_LOGGED_IN,
        username: action.username || state.username,
        uid: action.uid || state.uid,
        role: action.role || state.role,
        favorites: action.favorites || state.favorites,
        displayingLogInPanel: action.displayingLogInPanel || false,
        displayingAuthPanel: action.displayingAuthPanel || false
      };
    case C.AUTH_LOGOUT:
      return {
        status: C.AUTH_ANONYMOUS,
        username: 'guest',
        uid: null
      };
    default:
      return state;
  }
};
