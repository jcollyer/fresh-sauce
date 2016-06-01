var React = require('react');
var Authpanel = require('./components/authpanel');
var Player = require('./components/player');

var Wrapper = React.createClass({
  render: function() {
    return (
      <div id="app">
        <Player />
        <div className="wrapper">
          {this.props.children}
        </div>
        <Authpanel />
      </div>
    );
  }
});

module.exports = Wrapper;
