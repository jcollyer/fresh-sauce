export function validateQuote() {
  if (!content || content.length < 10){
    return "A quote needs at least 10 characters to be worthy of sharing with the world!"
  }
}
export function YTDurationToSeconds(duration) {
  let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  let hours = (parseInt(match[1]) || 0)
  let minutes = (parseInt(match[2]) || 0)
  let seconds = (parseInt(match[3]) || 0)
  return (hours * 3600 + minutes * 60 + seconds) * 1000
}
