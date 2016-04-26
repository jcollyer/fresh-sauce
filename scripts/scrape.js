var fs = require('fs');
var casper = require('casper').create();
var ids = [];
var stringifyedIds;
var path = 'scrapes/ids.js';

function getSCids() {
  var SCids = document.querySelectorAll('.sqs-block-content p iframe');
  return Array.prototype.map.call(SCids, function(e) {
    var id = e.getAttribute('src').substr(73,9);
    if (id.length != 9) {
      return null; // skip non-Sound Cloud elements
    }
    return id;
  })
  .filter(function(data){
    return data !== null; // filter the null out
  });
};

casper.start('http://www.mugatunes.com/homestream');

casper.then(function() {
  // get list of Sound Cloud IDs
  ids = this.evaluate(getSCids);
});

casper.run(function() {
    fs.write(path, ids, 'w');
    this.echo(ids.length + ' scrape success! ids found:');
    this.echo(' - ' + ids.join('\n - ')).exit();
});
