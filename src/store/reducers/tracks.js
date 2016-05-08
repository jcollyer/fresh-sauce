var C = require("../../constants");
var initialState = require("../initialstate");
var	_ = require("lodash");

module.exports = function(currentstate,action){
	var newstate;
	switch(action.type){
		case C.RECEIVE_TRACKS_DATA:
			return Object.assign({},currentstate,{
				hasreceiveddata: true,
				data: action.data
			});
		case C.AWAIT_NEW_TRACK_RESPONSE:
			return Object.assign({},currentstate,{
				submittingnew: true
			});
		case C.RECEIVE_NEW_TRACK_RESPONSE:
			return Object.assign({},currentstate,{
				submittingnew: false
			});
		case C.START_TRACK_EDIT:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.EDITING_TRACK;
			return newstate;
		case C.FINISH_TRACK_EDIT:
			newstate = _.cloneDeep(currentstate);
			delete newstate.states[action.qid];
			return newstate;
		case C.SUBMIT_TRACK_EDIT:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.SUBMITTING_TRACK;
			return newstate;
		default: return currentstate || initialState.tracks;
	}
};
