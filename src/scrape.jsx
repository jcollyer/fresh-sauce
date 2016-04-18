var React = require('react');
var Firebase = require('firebase');
var dataRef = new Firebase('https://fresh-sauce.firebaseio.com/');
//
var fs = require('fs');


var Scraper =
  React.createClass({
    getInitialState: function() {
      return {scids: []};
    },
    render: function() {
      return (
        <div>
          <button onClick={this.scrape}>Scrape!</button>
          {this.state.scids.map(function(id){
            return (
              <div>{id}</div>
            );
          })}
        </div>
      );
    }
  });
module.exports = Scraper;
