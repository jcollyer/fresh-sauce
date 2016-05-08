var React = require("react");
var C = require("../../constants");
var store = require('../../store');
var ReactRedux = require("react-redux");

var Player = React.createClass({
	render: function(){
		return (
        <div>hi there player #:{this.props.tracks.trackId}!</div>
    );
	}
});

module.exports = Player;

var mapStateToProps = function(appState){
	return {
		tracks: appState.tracks
	};
};

module.exports = ReactRedux.connect(mapStateToProps)(Player);
