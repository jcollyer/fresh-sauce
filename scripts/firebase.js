console.log("pushing....")
var fs = require('fs');
var Firebase = require('firebase');
var ref = new Firebase('https://fresh-sauce.firebaseio.com');
var usersRef = ref.child("items");
var ids = {id: 88888};
fs.readFile('./scrapes/ids.js', function(err, data) {

    // Format data
    newData = data.join(",").replace(/[,]+/g, "").match(/.{1,9}/g);

    // Add data to firebase
    usersRef.push({newData});

    console.log("success! added tracks: " + newData);
});

setTimeout(function() {
  console.log("bye...");
  process.exit();
},2500);
