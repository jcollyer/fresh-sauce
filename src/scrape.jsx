var React = require('react');
// var Firebase = require('firebase');
// var dataRef = new Firebase('https://fresh-sauce.firebaseio.com/');

require('../node_modules/firebase/lib/firebase-web.js');
var ReactFireMixin = require('../node_modules/reactfire/dist/reactfire.js');

var Scraper =
  React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function() {
      return {items: [9099], scids: []};
    },
    // componentWillMount: function() {
    //   var ref = new Firebase("https://fresh-sauce.firebaseio.com/ids");
    //   this.bindAsArray(ref, "items");
    // },
    // componentWillUnmount: function() {
    //   this.firebaseRef.off();
    // },
    render: function() {
      return (
        <div>
          <button onClick={this.scrape}>Scrape!</button>
          {this.state.items}
        </div>
      );
    }
  });
module.exports = Scraper;
