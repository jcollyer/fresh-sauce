import React from 'react'
import Player from '../containers/player'
import Auth from '../containers/auth'


export default function App({ children }) {
  return (
    <div id='wrapper'>
      <Auth />
      <Player />
      {children}
    </div>
  )
}
