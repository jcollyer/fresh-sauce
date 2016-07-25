import C from '../constants'

export default {
  auth: {
    currently: C.ANONYMOUS,
    username: 'guest',
    uid: null,
    displayingLogInPanel: false,
    favorites: {}
  },
  tracks: {
    trackPlaying: false,
    submittingnew: false,
    currentTrack: {id: 266853527},
    trackPosition: 0,
    trackPercentage: 0,
    duration: 0
  },
  tracklist: {
    tracks: [],
    hasreceiveddata: false,
  },
  players: {}
}
