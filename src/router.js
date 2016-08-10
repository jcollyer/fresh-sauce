import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './components/app'
import Tracklist from './containers/tracklist'
import TrackDetail from './containers/track-detail'
import UserDetail from './containers/user-detail'
import Admin from './containers/admin'

export default (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Tracklist} />
      <Route path='/tracks(/:id)' component={TrackDetail} />
      <Route path='/users(/:id)' component={UserDetail} />
      <Route path='/admin(/:id)' component={Admin} />
    </Route>
  </Router>
)
