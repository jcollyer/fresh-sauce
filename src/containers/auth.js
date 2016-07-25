import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser, showLogInPanel } from '../actions/auth'
// import C from '../constants'

export default class Auth extends Component {
  componentWillMount(){
    var uiConfig = {
      'signInSuccessUrl': '/',
      'signInOptions': [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
       //  firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  render() {
    const { username, displayingLogInPanel } = this.props
    // debugger;
    return (
      <div>
        <h1>Welcome {username} to My Awesome App</h1>
        <button onClick={() => this.props.logoutUser()} className={ username === "guest" ? "hide" : ""}>Log Out</button>
        <button onClick={() => this.props.showLogInPanel()} className={ username === "guest" ? "" : "hide"} >Log In</button>
        <div id="firebaseui-auth-container" className={ displayingLogInPanel ? "" : "hide"}></div>
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    username: appState.auth.username,
    displayingLogInPanel: appState.auth.displayingLogInPanel
  }
}

export default connect(mapStateToProps, { logoutUser, showLogInPanel })(Auth)
