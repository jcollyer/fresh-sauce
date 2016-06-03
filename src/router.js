import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './components/app'
import Trackslist from './containers/trackslist'

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Trackslist} />
    </Route>
  </Router>
)
