/*
This is the "sitemap" of our app!
*/

var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Wrapper = require('./pages/wrapper');
var Trackslist = require('./pages/trackslist');

module.exports = (
  <Route path="/" component={Wrapper}>
    <IndexRoute component={Trackslist} />
  </Route>
);
