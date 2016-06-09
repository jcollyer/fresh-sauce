import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './components/app'
import Tracklist from './containers/tracklist'

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Tracklist} />
    </Route>
  </Router>
)
