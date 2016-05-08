var Redux = require("redux");
var	authReducer = require("./auth")
var	tracksReducer = require("./tracks");

var rootReducer = Redux.combineReducers({
	auth: authReducer,
	tracks: tracksReducer
});

module.exports = rootReducer;
