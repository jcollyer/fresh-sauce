var Firebase = require('firebase');
var ref = new Firebase('https://fresh-sauce.firebaseio.com/');
var idsRef = ref.child("ids");
var ids = [];
var thisId;

var pushTrack = function(url) {
  // if the id dose not exist yet in the ids array
  if(ids.indexOf(thisId) == -1){
    var idLength, thisType;

    if (url.split(".")[1] === "soundcloud") {
      idLength = 9;
      thisType = "sc";
    } else if(url.split(".")[1] === "youtube") {
      idLength = 11;
      thisType = "yt";
    } else {
      return;
    }

    var thisId = url.substr(url.lastIndexOf("/")+1, idLength);
    //push to local array
    ids.push(thisId);
    //push to firebase
    idsRef.push({id: thisId, type: thisType});
  }
  console.log("success! added id: " + thisId + " to type: " + thisType);

  console.log("bye...");
  process.exit();
};

module.exports = pushTrack;
