import React from 'react'
import { ReactRouter, Route, IndexRoute } from 'react-router'
import Wrapper from './pages/wrapper'
import Trackslist from './pages/trackslist'

module.exports = (
  <Route path="/" component={Wrapper}>
    <IndexRoute component={Trackslist} />
  </Route>
);
