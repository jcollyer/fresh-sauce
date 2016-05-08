/*
This is the entry point for the app! From here we merely import our routes definitions,
then use React and React-DOM to render it.
*/

var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./app.js');


ReactDOM.render(

	<App />,
	document.getElementById("root")
);
