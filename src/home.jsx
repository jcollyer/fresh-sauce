var React = require('react');
var Playlist = require('./playlist.jsx');
var Player = require('./player.jsx');

// require('./style/grid.min.less');
// require('./style/home.less');

var Home =
  React.createClass({
    render: function() {
      return (
        <div>
          <Player />
          <Playlist />
        </div>
      );
    }
  });
module.exports = Home;
