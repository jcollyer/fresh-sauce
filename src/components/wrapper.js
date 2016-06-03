var React = require('react');
var Authpanel = require('../containers/authpanel');
var Player = require('../containers/player');

var Wrapper = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <Authpanel />
                <Player />
                <div className="center">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Wrapper;
