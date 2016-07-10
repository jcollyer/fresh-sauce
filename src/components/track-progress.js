import React from 'react'

export default (props) => {
  const { track } = props

  return (
		<div id="track-prgress">
	    <div id="progress-container">
	      <div id="progress" onClick={props.onPlayTrackClicked}></div>
	    </div>
		</div>
  )
}
