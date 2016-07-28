import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'


class UserDetail extends Component {
  render() {
    const { username } = this.props
    return (
      <div id='user-detail'>
        hi, {username}
      </div>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    username: appState.auth.username
  }
}

export default withRouter(connect(mapStateToProps)(UserDetail))
