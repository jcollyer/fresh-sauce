var React = require('react');
require('../node_modules/firebase/lib/firebase-web.js');
var ReactFireMixin = require('../node_modules/reactfire/dist/reactfire.js');

var Playlist =
  React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function() {
      return {items: []};
    },
    componentWillMount: function() {
      // connect to firebase data
      ref = new Firebase("https://fresh-sauce.firebaseio.com/items");
      // set firesbase items to this.state.items
      this.bindAsArray(ref, "items");
    },
    componentWillUnmount: function() {
      this.firebaseRef.off();
    },
    render: function() {
      return (
        <div id="track-list">
          {this.state.items.map(function(item, index) {
            return (
              <div className="track" key={index}>
                <img src={item['track'].artwork_url} />
                {item['track'].artist} -
                <b>{item['track'].title}</b>
              </div>
            );
          })}
        </div>
      );
    }
});
module.exports = Playlist;
