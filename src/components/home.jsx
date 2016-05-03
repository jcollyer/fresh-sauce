import React from 'react'
import Playlist from './playlist.jsx'
import Player from './player.jsx'
import Tracks from './tracks'

// require('./style/grid.min.less');
// require('./style/home.less');

var Home =
  React.createClass({
    render: function() {
      return (
        <div>
          <Player />
          <Tracks />
          <Playlist />
        </div>
      );
    }
  });
module.exports = Home;
