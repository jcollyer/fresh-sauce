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
  track: {
    trackPlaying: false,
    currentTrack: {
      id: 266853527,
      artwork_url_hires: '',
      provider: '',
      artist: '',
      icon: ''
    },
    trackPosition: 0,
    trackPercentage: 0,
    duration: 0
  },

  tracklist: {
    tracks: [],
    hasreceiveddata: false,
    shuffle: false
  },
  players: {}
}
