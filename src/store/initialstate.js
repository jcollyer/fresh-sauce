var C = require("../constants");

module.exports = {
	auth: {
		currently: C.ANONYMOUS,
		username: null,
		uid: null
	},
	tracks: {
		hasreceiveddata: false,
		submittingnew: false,
		states: {}, // this will store per track id if we're reading, editing or awaiting DB response
		data: {}, // this will contain firebase data
		trackId: "fake-trackId" // this is the current track
	}
};
