import C from '../constants'

export default {
  auth: {
    currently: C.ANONYMOUS,
    username: null,
    uid: null
  },
  tracks: {
    trackPlaying: false,
    hasreceiveddata: false,
    submittingnew: false,
    tracks: [],
    currentTrack: {id: 266853527},
    trackPosition: 0,
    trackPercentage: 0,
    duration: 0
  }
}
