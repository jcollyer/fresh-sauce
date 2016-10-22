export function toHHMMSS(time) {
  time = Number(time)/1000;
  var h = Math.floor(time / 3600);
  var m = Math.floor(time % 3600 / 60);
  var s = Math.floor(time % 3600 % 60);

  return (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s;
}

export function YTDurationToSeconds(duration) {
  let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  let hours = (parseInt(match[1]) || 0)
  let minutes = (parseInt(match[2]) || 0)
  let seconds = (parseInt(match[3]) || 0)
  return (hours * 3600 + minutes * 60 + seconds) * 1000
}

export function sanitizeTrack(track) {
  let sanitizedTrack = {}
  if(track.kind === 'sc') {
    sanitizedTrack = {
      id: track.id,
      artwork_url: track.artwork_url,
      artwork_url_midres: track.artwork_url_midres,
      artwork_url_hires: track.artwork_url_hires,
      duration: track.duration,
      featured: track.featured,
      genre: track.genre,
      kind: track.kind,
      tag_list: track.tag_list,
      timestamp: track.timestamp,
      title: track.title,
      artist: track.artist,
      permalink: track.permalink,
      linkTitle: 'SoundCloud ',
      linkIcon: 'icon icon-soundcloud ',
      href: track.href || ""
    }
  } else if (track.kind === 'yt') {
    sanitizedTrack = {
      id: track.id,
      artwork_url: track.artwork_url,
      artwork_url_midres: track.artwork_url_midres,
      artwork_url_hires: track.artwork_url_hires,
      duration: YTDurationToSeconds(track.duration),
      featured: track.featured,
      genre: track.genre,
      kind: track.kind,
      tag_list: track.tag_list,
      timestamp: track.timestamp,
      title: track.title,
      artist: track.artist,
      permalink: track.permalink,
      linkIcon: 'icon icon-youtube',
      linkTitle: 'YouTube',
      href: track.href || ""
    }
  }
  return sanitizedTrack
}
