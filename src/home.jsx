var React = require('react');
var Playlist = require('./playlist.jsx');

// require('./style/grid.min.less');
// require('./style/home.less');

var Home =
  React.createClass({
    render: function() {
      return (
        <div>
          <h3>this is the home page :)</h3>
          <Playlist />
        </div>
      );
    }
  });
module.exports = Home;
