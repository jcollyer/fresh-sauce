console.log("pushing....")
var fs = require('fs');
var Firebase = require('firebase');
var ref = new Firebase('https://fresh-sauce.firebaseio.com');
var usersRef = ref.child("items");
var ids = {id: 88888};
fs.readFile('./scrapes/ids.json', function(err, data) {
  // if (err) throw err;


    usersRef.set({data});
    console.log(data);
});




//
//
//
setTimeout(function() {
  console.log("bye...");
  process.exit();
},2500);
//
// var content;
// // First I want to read the file
// fs.readFile('./scrapes/ids.txt', function read(err, data) {
//     if (err) {
//         throw err;
//     }
//     content = data;
//
//     // Invoke the next step here however you like
//     console.log(content);   // Put all of the code here (not the best solution)
//     processFile();          // Or put the next step in a function and invoke it
// });
//
// function processFile() {
//     console.log(content);
// }
