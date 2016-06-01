export function addTrack(track) {
  return {
    type: 'addTrack',
    track
  }
}

export function deleteTrack(index) {
  return {
    type: 'deletTrack',
    index
  }
}
