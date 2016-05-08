var React = require('react');
var Authpanel = require('./components/authpanel');

var Wrapper = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <Authpanel />
                <div className="center">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Wrapper;
