import React, { Component } from 'react'
import Auth from '../containers/auth'
import HomeButton from '../containers/home-button'

export default class ActionBar extends Component {
  render() {
    return (
      <div id='action-bar'>
        <HomeButton />
        <Auth />
      </div>
    )
  }
}
