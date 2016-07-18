import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openAuth, logoutUser } from '../actions/auth'
import C from '../constants'

class Auth extends Component {
  getJSX(props) {
    switch (props.auth.status) {
      case C.AUTH_LOGGED_IN: return (
        <div>
          <span>Logged in as {props.auth.username}.</span>
          {" "}<button onClick={props.logoutUser}>Log out</button>
        </div>
      )
      case C.AUTH_AWAITING_RESPONSE: return (
        <div>
          <button disabled>authenticating...</button>
        </div>
      )
      default: return (
        <div>
          <button onClick={props.openAuth}>Log in</button>
          
          <p>Log in with your Facebook account below.</p>

          <div className="quickstart-user-details-container">
            Firebase sign-in status: <span id="quickstart-sign-in-status">Unknown</span>
            <div>Firebase auth <code>currentUser</code> object value:</div>
            <pre><code id="quickstart-account-details">null</code></pre>
            <div>Facebook OAuth Access Token:</div>
            <pre><code id="quickstart-oauthtoken">null</code></pre>
          </div>
        </div>
      )
    }
  }
  render() {
    return this.getJSX(this.props)
  }
}

const mapStateToProps = (appState) => {
  return {
    auth: appState.auth
  }
}

const mapDispatchToProps = {
  openAuth,
  logoutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
