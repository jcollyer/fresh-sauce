import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import store from './store'
import router from './router'
import { startListeningToTracks } from './actions/tracks'
import SC from 'soundcloud' // soundcloud object

import './style/styles.less'
import './soundcloud' // soundcloud player widget

// initialize soundcloud
SC.initialize({
  client_id: '480b42686dbd3b48da099bed50e6af72',
  redirect_uri: 'http://localhost:3000/callback.html'
});

// initialize youtube
 var tag = document.createElement('script');
 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById("root")
);

// setup Firebase listeners
setTimeout(function(){
  // store.dispatch(actions.startListeningToAuth())
  store.dispatch(startListeningToTracks())
})
