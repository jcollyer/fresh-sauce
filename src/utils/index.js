export function validateQuote() {
  if (!content || content.length < 10){
    return "A quote needs at least 10 characters to be worthy of sharing with the world!"
  }
}

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

export function playTrack(track, players){
  if(players.playerYT.a) { // if a YouTube video, pause, and clear.
    players.playerYT.pauseVideo()
    players.playerYT.clearVideo()
  }

  if(track.kind === 'sc'){ // if Soundcloud
    players.playerSC.play({streamUrl: 'https://api.soundcloud.com/tracks/'+track.id+'/stream'});
  } else {
    players.playerYT.cueVideoById(track.id)
    players.playerYT.playVideo()
  }
}
