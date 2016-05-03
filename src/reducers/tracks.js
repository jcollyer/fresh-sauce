import Immutable from 'immutable'

export default (state = Immutable.List([260404935]), action) => {
  switch(action.type) {
    case 'addTrack':
      return state.push(action.track)
    default:
      return state
  }
}
