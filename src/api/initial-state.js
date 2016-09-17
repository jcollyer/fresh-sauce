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
      genre: '',
      icon: '',
      id: 266853527, //so soundcloud has an ID to load the player onload
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
    allTracks: [],
    hasreceiveddata: false,
    shuffle: false,
    genre: window.location.pathname.split('/')[1] === 'genre' ? window.location.pathname.split('/').splice(-1)[0] : ''
  },
  players: {},
  genres: [
    {genre: 'hip-hop', name: 'Hip-Hop'},
    {genre: 'house', name: 'House'},
    {genre: 'funk', name: 'Funk'},
    {genre: 'classic', name: 'Classic'}
  ]
}
