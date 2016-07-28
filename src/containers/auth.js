import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser, toggleLogInPanel, toggleAuthPanel } from '../actions/auth'
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
    const { username, displayingLogInPanel, displayingAuthPanel } = this.props
    // debugger;
    return (
      <div id='auth'>
        <div id='logged-in' className={ username === 'guest' ? 'hide' : ''}>
          <div id='auth-button' className='icon icon-head' onClick={() => this.props.toggleAuthPanel()}>
            <div id='auth-menu' className={ displayingAuthPanel ? '' : 'hide'}>
            <div id='username'>hi, {username}</div>
            <div id='profile'>Profile</div>
            <div id='logout' onClick={() => this.props.logoutUser()}>Log Out</div>
            </div>
          </div>
        </div>
        <div id='logged-out' className={ username === 'guest' ? '' : 'hide'}>
          <div id='loggin-button' className='icon icon-head' onClick={() => this.props.toggleLogInPanel()}></div>
        </div>
        <div id='firebaseui-auth-container' className={ displayingLogInPanel ? '' : 'hide'}></div>
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    username: appState.auth.username,
    displayingLogInPanel: appState.auth.displayingLogInPanel,
    displayingAuthPanel: appState.auth.displayingAuthPanel
  }
}

export default connect(mapStateToProps, { logoutUser, toggleLogInPanel, toggleAuthPanel })(Auth)
