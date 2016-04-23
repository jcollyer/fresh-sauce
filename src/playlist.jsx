var React = require('react');
require('../node_modules/firebase/lib/firebase-web.js');
var ReactFireMixin = require('../node_modules/reactfire/dist/reactfire.js');

var Playlist =
  React.createClass({
    firebaseItems: [],
    mixins: [ReactFireMixin],
    getInitialState: function() {
      return {items: []};
    },
    componentWillMount: function() {

      // connect to firebase data
      this.firebaseRef = new Firebase("https://fresh-sauce.firebaseio.com/items");

      // onload and when added - loop through each child of "/items"
      this.firebaseRef.on("child_added", function(dataSnapshot) {

        // array of items from firebase
        var itemArray = dataSnapshot.val().newData;

        // loops through array and adds each track id
        for(i=0;i<itemArray.length;i++){
          this.firebaseItems.push(dataSnapshot.val().newData[i]);
        }

        // set track ids to this.state.items
        this.setState({
          items: this.firebaseItems
        });
      }.bind(this));
    },
    componentWillUnmount: function() {
      this.firebaseRef.off();
    },
    render: function() {
      return (
        <div>
          {this.state.items.map(function(item, index) {
            return (
              <div key={index}>
                {item}
              </div>
            );
          })}
        </div>
      );
    }
});
module.exports = Playlist;
