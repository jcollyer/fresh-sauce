import React from'react'
import ReactDOM from'react-dom'
import Provider from 'react-redux'
import { Router, hashHistory } from 'react-router'
import store from './store'
import routes from './routes'
import actions from './actions'

import './style/styles.less'
import './style/styles.css'

//soundcloud widget api
require('./sc-player.js');

ReactDOM.render(
	// The top-level Provider is what allows us to `connect` components to the store
	// using ReactRedux.connect
	<Provider store={store}>
		<Router history={hashHistory} routes={routes}/>
	</Provider>,
	document.getElementById("root")
);

// setup Firebase listeners
setTimeout(function(){
	store.dispatch( actions.startListeningToAuth() );
	store.dispatch( actions.startListeningToTracks() );
});
