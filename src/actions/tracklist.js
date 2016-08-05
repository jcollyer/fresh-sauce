import C from '../constants'
import Firebase from 'firebase'
const tracksRef = new Firebase(C.FIREBASE).child('tracks')

function loadTracks(startAt){
  console.log(startAt)
  const tracksArr = []

  tracksRef.orderByChild('timestamp').startAt(startAt).limitToFirst(15).on('value', (snapshot) => {
    snapshot.forEach((track) => {
      let sanitizedTrack = sanitizeTrack(track.val())
      tracksArr.push(sanitizedTrack)
    })
  })
  return tracksArr
}

function sanitizeTrack(track) {
  let sanitizedTrack = {}
  if(track.kind === 'sc') {
    sanitizedTrack = {
      id: track.id,
      artwork_url: track.artwork_url,
      artwork_url_hires: track.artwork_url_hires,
      duration: track.duration,
      featured: track.featured,
      kind: track.kind,
      tag_list: track.tag_list,
      timestamp: track.timestamp,
      title: track.title,
      artist: track.artist,
      scURL: 'https://soundcloud.com/'+ track.artist.replace(/\s/g, '') + '/' + track.permalink,
      linkTitle: 'SoundCloud ',
      linkIcon: 'icon icon-soundcloud '
    }
  } else if (track.kind === 'yt') {
    sanitizedTrack = {
      id: track.id,
      artwork_url: track.artwork_url,
      artwork_url_hires: track.artwork_url_hires,
      duration: track.duration,
      featured: track.featured,
      kind: track.kind,
      tag_list: track.tag_list,
      timestamp: track.timestamp,
      title: track.title,
      artist: track.artist,
      scURL: 'https://www.youtube.com/watch?v='+track.id,
      linkIcon: 'icon icon-youtube',
      linkTitle: 'YouTube'
    }
  }
  return sanitizedTrack
}

export function startListeningToTracks() {
  return function(dispatch, getState){
    let tracksOnloadArr = []
    let firstTimestamp

    tracksRef.orderByChild('timestamp').on('value', (snapshot) => {

      snapshot.forEach((track) => {
        tracksOnloadArr.push(track.val())
      })
      firstTimestamp = tracksOnloadArr[0].timestamp
      tracksOnloadArr = loadTracks(firstTimestamp)

      dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: tracksOnloadArr, hasreceiveddata: true, shuffle: false })
      // set first track in tracklist
      dispatch({ type: C.SET_TRACK, track: tracksOnloadArr[0], trackPlaying: false })
    })
  }
}

export function nextPage() {
  return function(dispatch, getState){
    let lastTrackTimestamp = getState().tracklist.tracks.splice(-1)[0].timestamp
    let tracksArr = loadTracks(lastTrackTimestamp)

    dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: tracksArr, hasreceiveddata: true, shuffle: getState().tracklist.shuffle })
  }
}

export function toggleShuffleTracks() {
  return function(dispatch, getState) {
    if (getState().tracklist.shuffle){
      dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: getState().tracklist.tracks, hasreceiveddata: true, shuffle: false })
    } else {
      dispatch({ type: C.RECEIVE_TRACKS_DATA, tracks: getState().tracklist.tracks, hasreceiveddata: true, shuffle: true })
    }
  }
}

// for /tracks/<trackID> urls
export function setTrackDetailPage(id) {
  return function(dispatch, getState){
    let trackDetail = {}
    let sanitizedTrack = {}
    tracksRef.orderByChild('id').equalTo(id).on("value", function(snapshot) {
      let track = snapshot.val()[Object.keys(snapshot.val())]
      let sanitizedTrack = sanitizeTrack(track)
      dispatch({ type: C.SET_TRACK_DETAIL_PAGE, trackDetail: sanitizedTrack, trackPlaying: false })
    })
  }
}
