import C from '../constants'
import Firebase from 'firebase'
const fireRef = new Firebase(C.FIREBASE)
const usersRef = fireRef.child('users')

export const startListeningToAuth = () => {
  return (dispatch, getState) => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        checkIfUserExists(user)
        // set user properties
        usersRef.child(user.uid).once('value', function(snapshot) {
          let favorites = snapshot.val().favorites || {}
          let role = snapshot.val().role || ''
          dispatch({ type: C.AUTH_LOGIN, uid: user.uid, username: user.displayName, favorites: favorites, role: role })
        });

        // listen for changes
        usersRef.on('child_changed', function(snapshot) {
          let favorites = snapshot.val().favorites || {}
          dispatch({ type: C.AUTH_LOGIN, favorites: favorites })
        })

      } else {
        if (getState().auth.status !== C.AUTH_ANONYMOUS) {
          dispatch({ type: C.AUTH_LOGOUT })
        }
      }
    })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: C.AUTH_LOGOUT })
    firebase.auth().signOut()
  }
}

export const toggleLogInPanel = () => {
  return (dispatch, getState) => {
    if(getState().auth.displayingLogInPanel){
      dispatch({ type: C.AUTH_LOGIN, displayingLogInPanel: false })
    } else {
      dispatch({ type: C.AUTH_LOGIN, displayingLogInPanel: true })
    }
  }
}

export const toggleAuthPanel = () => {
  return (dispatch, getState) => {
    if(getState().auth.displayingAuthPanel) {
      dispatch({ type: C.AUTH_LOGIN, displayingAuthPanel: false })
    } else {
      dispatch({ type: C.AUTH_LOGIN, displayingAuthPanel: true })
    }
  }
}

function userExistsCallback(user, exists) {
  if (exists) {
    usersRef.child(user.uid).update({
      lastLogin: Date.now()
    })
  } else {
    usersRef.child(user.uid).set({
      displayName: user.displayName,
      email: user.email,
      role: 'member',
      favorites: {},
      lastLogin: Date.now()
    })
  }
}

// Tests to see if /users/<userId> has any data.
function checkIfUserExists(user) {
  usersRef.child(user.uid).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    userExistsCallback(user, exists);
  });
}
