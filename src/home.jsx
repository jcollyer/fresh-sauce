var React = require('react');
var Scraper = require('./scrape.jsx');

// require('./style/grid.min.less');
// require('./style/home.less');

var Home =
  React.createClass({
    render: function() {
      return (
        <div>
          <h3>this is the home page :)</h3>
          <Scraper />
        </div>
      );
    }
  });
module.exports = Home;
