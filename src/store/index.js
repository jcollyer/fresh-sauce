var Redux = require("redux"),
	rootReducer = require("./reducers"),
	initialState = require("./initialstate"),
	thunk = require('redux-thunk').default; // allows us to use asynchronous actions


// A super-simple logger
var logger = store => next => action => {
	console.log('dispatching', action.type,action)
	var result = next(action)
	console.log('next state', store.getState())
	return result
}


module.exports = Redux.applyMiddleware(thunk,logger)(Redux.createStore)(rootReducer,initialState);
