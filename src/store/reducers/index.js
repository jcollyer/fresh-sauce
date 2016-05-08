var Redux = require("redux");
var	authReducer = require("./auth")
var	quotesReducer = require("./quotes");

var rootReducer = Redux.combineReducers({
	auth: authReducer,
	quotes: quotesReducer
});

module.exports = rootReducer;
