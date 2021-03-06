import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import { logoutUser, toggleLogInPanel, toggleAuthPanel } from '../actions/auth'
// import C from '../constants'

class Auth extends Component {
  logoutUser() {
    this.props.router.push('/')
    this.props.logoutUser()
  }
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
    const { username, uid, displayingLogInPanel, displayingAuthPanel } = this.props
    return (
      <div id='auth'>
        <div id='logged-in' className={ username === 'guest' ? 'hide' : ''}>
          <div id='auth-button' onClick={() => this.props.toggleAuthPanel()}>
            <Link to={`/users/${uid}`}><p>{username}</p></Link>
            <i className='icon icon-user'></i>

            <div id='auth-menu' className={ displayingAuthPanel ? '' : 'hide'}>
              <div className='menu-link' id='logout' onClick={() => this.logoutUser()}>Log Out</div>
            </div>
          </div>
        </div>
        <div id='logged-out' className={ username === 'guest' ? '' : 'hide'}>
          <div id='loggin-button' onClick={() => this.props.toggleLogInPanel()}>
            <i className='icon icon-user'></i>
            <p>{username}</p>
          </div>
        </div>
        <div id='log-in' className={ displayingLogInPanel ? '' : 'hide'}>
          <i className='icon icon-close' onClick={() => this.props.toggleLogInPanel()}></i>
          <div id='firebaseui-auth-container' ></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    username: appState.auth.username,
    uid: appState.auth.uid,
    displayingLogInPanel: appState.auth.displayingLogInPanel,
    displayingAuthPanel: appState.auth.displayingAuthPanel
  }
}

export default withRouter(connect(mapStateToProps, { logoutUser, toggleLogInPanel, toggleAuthPanel })(Auth))
