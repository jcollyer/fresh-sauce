import React from 'react'
import Authpanel from '../containers/authpanel'
import Player from '../containers/player'

export default function App({ children }) {
  return (
    <div id="wrapper">
      <Player />
      {children}
    </div>
  )
}
