import React from 'react'

export default (props) => {
  let progressStyle = {
    width: props.progressPercentage
  }
  return (
		<div id="track-prgress">
	    <div id="progress-container" onClick={props.onTrackProgressClicked}>
	      <div id="progress" style={progressStyle}></div>
	    </div>
		</div>
  )
}
