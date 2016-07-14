import React, { Component } from 'react'

export default class TrackProgress extends Component {
  onTrackProgressClicked(event) {
    let element = document.getElementById("progress-container")
    let width = element.clientWidth
    let xoffset = event.clientX - element.offsetLeft
    let duration = this.props.duration
    let position = (xoffset / width) * duration;
    // console.log("dur", duration)
    this.props.trackProgressClick(position)
  }
  render() {
    const { progressPercentage, trackProgressClick } = this.props
    let progressStyle = {
      width: progressPercentage + "%"
    }

    return (
      <div id="track-prgress">
        <div id="progress-container" data-progress="true" onClick={(event) => this.onTrackProgressClicked(event)}>
          <div id="progress" style={progressStyle}></div>
        </div>
      </div>
    )

  }
}
