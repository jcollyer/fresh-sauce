var React = require('react');
var Authpanel = require('./components/authpanel');
var Player = require('./components/player');

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
