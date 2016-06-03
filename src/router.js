import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Wrapper from './components/wrapper'
import Trackslist from './containers/trackslist'

export default (
  <Router history={hashHistory}>
    <Route path="/" component={Wrapper}>
      <IndexRoute component={Trackslist} />
    </Route>
  </Router>
)
