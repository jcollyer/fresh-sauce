import React from 'react'
import Player from '../containers/player'
import Auth from '../containers/auth'
import AddTrack from '../containers/add-track'

export default function App({ children }) {
  return (
    <div id="wrapper">
      <AddTrack />
      <Player />
      <Auth />
      {children}
    </div>
  )
}
