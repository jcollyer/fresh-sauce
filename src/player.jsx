var React = require('react');
require('./style/player.less');
var Player =
  React.createClass({
    render: function() {
      return (
        <div>

          <iframe id="soundcloud_widget" width="100%" height="166" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1848538&show_artwork=true"></iframe>
        </div>
      );
    }
});

module.exports = Player;
