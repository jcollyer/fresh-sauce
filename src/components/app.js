import React from 'react'
import Player from '../containers/player'
import ActionBar from './action-bar'


export default function App({ children }) {
  return (
    <div id='wrapper'>
      <ActionBar />
      <Player />
      {children}
    </div>
  )
}
