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
