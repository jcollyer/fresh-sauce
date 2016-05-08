/*
This is the entry point for the app! From here we merely import our routes definitions,
then use React and React-DOM to render it.
*/

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var hashHistory = require('react-router').hashHistory;
var Provider = require('react-redux').Provider;
var store = require('./store');
var routes = require('./routes');
var actions = require('./actions');
var App = require('./app.js');
require('./style/styles.css');

ReactDOM.render(

	<App />,
	document.getElementById("root")
);

// setup Firebase listeners
setTimeout(function(){
	store.dispatch( actions.startListeningToAuth() );
	store.dispatch( actions.startListeningToTracks() );
});
