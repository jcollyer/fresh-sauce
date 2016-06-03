import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import store from './store'
import router from './router'
import { startListeningToTracks } from './actions/tracks'

import './style/styles.less'

ReactDOM.render(
	<Provider store={store}>{router}</Provider>,
	document.getElementById("root")
);

// setup Firebase listeners
setTimeout(function(){
	// store.dispatch(actions.startListeningToAuth())
	store.dispatch(startListeningToTracks())
})
