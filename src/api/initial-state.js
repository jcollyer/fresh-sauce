import C from '../constants'

export default {
  auth: {
    currently: C.ANONYMOUS,
    username: 'guest',
    uid: null,
    displayingLogInPanel: false,
    displayingAuthPanel: false,
    favorites: {}
  },
  tracks: {
    trackPlaying: false,
    submittingnew: false,
    currentTrack: {
      id: 266853527,
      artwork_url_hires: '',
      provider: '',
      artist: '',
      icon: ''
    },
    trackPosition: 0,
    trackPercentage: 0,
    duration: 0,
    shuffle: false
  },
  tracklist: {
    tracks: [],
    hasreceiveddata: false
  },
  players: {}
}
