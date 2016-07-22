import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/app'
import Tracklist from './containers/tracklist'
import TrackDetail from './containers/track-detail'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Tracklist} />
      <Route path="/tracks/:trackId" component={TrackDetail} />
    </Route>
  </Router>
)
