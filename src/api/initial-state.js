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
    currentTrack: {
      artist: '',
      artwork_url: '',
      artwork_url_hires: '',
      duration: '',
      featured: '',
      icon: '',
      id: 266853527,
      kind: '',
      linkIcon: '',
      linkTitle: '',
      permalink: '',
      provider: '',
      tag_list: '',
      timestamp: '',
      title: ''
    },
    trackPlaying: false,
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
