import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import store from './store'
import router from './router'
import { startListeningToAuth } from './actions/auth'
import { startListeningToTracks } from './actions/tracklist'
import { setPlayers } from './actions/players'
import SC from 'soundcloud' // soundcloud object

import './style/styles.less'
import './soundcloud' // soundcloud player widget

// initialize Firebase
let fire_config = {
  apiKey: "AIzaSyDCtwzMtFhKLDg77_v_eYrNvSv02JbMrhA",
  authDomain: "fresh-sauce.firebaseapp.com",
  databaseURL: "https://fresh-sauce.firebaseio.com",
  storageBucket: "fresh-sauce.appspot.com",
};
firebase.initializeApp(fire_config);

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
  store.dispatch(startListeningToAuth())
  store.dispatch(startListeningToTracks())
  store.dispatch(setPlayers())
},500)
