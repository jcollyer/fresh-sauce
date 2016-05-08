/*
This is the initial state of the Redux Store.
*/

var C = require("../constants");

module.exports = {
	auth: {
		currently: C.ANONYMOUS,
		username: null,
		uid: null
	},
	quotes: {
		hasreceiveddata: false,
		submittingnew: false,
		states: {}, // this will store per quote id if we're reading, editing or awaiting DB response
		data: {} // this will contain firebase data
	}
};
