import C from '../constants'
import Firebase from 'firebase'

const fireRef = new Firebase(C.FIREBASE)

export const startListeningToAuth = () => {
  return (dispatch, getState) => {
    // fireRef.onAuth((authData) => {
    //   if (authData) {
    //     dispatch({
    //       type: C.AUTH_LOGIN,
    //       uid: authData.uid,
    //       username: authData.facebook.displayName || authData.facebook.username
    //     })
    //   } else {
    //     if (getState().auth.status !== C.AUTH_ANONYMOUS) {
    //       dispatch({ type: C.AUTH_LOGOUT })
    //     }
    //   }
    // })

    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let userDetails = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
          refreshToken: user.refreshToken,
          providerData: user.providerData
        }
        // [END_EXCLUDE]
        dispatch({
          type: C.AUTH_LOGIN,
          uid: user.uid,
          username: user.displayName
        })
      } else {
        // User is signed out.
        // [START_EXCLUDE]
        // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out'
        // document.getElementById('quickstart-sign-in').textContent = 'Log in with Facebook'
        // document.getElementById('quickstart-account-details').textContent = 'null'
        // document.getElementById('quickstart-oauthtoken').textContent = 'null'
        // [END_EXCLUDE]
        // if (getState().auth.status !== C.AUTH_ANONYMOUS) {
        //   dispatch({ type: C.AUTH_LOGOUT })
        // }
      }
      // [START_EXCLUDE]
      // document.getElementById('quickstart-sign-in').disabled = false
      // [END_EXCLUDE]
    })
  }
}

export const openAuth = () => {
  return (dispatch) => {
    dispatch({ type: C.AUTH_OPEN })
    if (!firebase.auth().currentUser) {
      // [START createprovider]
      let provider = new firebase.auth.FacebookAuthProvider()
      // [END createprovider]
      // [START addscopes]
      provider.addScope('user_birthday')
      // [END addscopes]
      // [START signin]
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        let token = result.credential.accessToken
        // The signed-in user info.
        let user = result.user
        // [START_EXCLUDE]
        // document.getElementById('quickstart-oauthtoken').textContent = token
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code
        let errorMessage = error.message
        // The email of the user's account used.
        let email = error.email
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.')
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error)
        }
        // [END_EXCLUDE]
      })
      // [END signin]
    } else {
      // [START signout]
      firebase.auth().signOut()
      // [END signout]
    }
    // [START_EXCLUDE]
    // document.getElementById('quickstart-sign-in').disabled = true
    // [END_EXCLUDE]
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: C.AUTH_LOGOUT })
    // fireRef.unauth()
    firebase.auth().signOut()
  }
}
