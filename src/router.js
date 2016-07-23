import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './components/app'
import Tracklist from './containers/tracklist'
import TrackDetail from './containers/track-detail'

export default (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Tracklist} />
      <Route path='/tracks(/:id)' component={TrackDetail} />
    </Route>
  </Router>
)
