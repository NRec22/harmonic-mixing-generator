//playlist objects have a number (1-12) and a key(m/d) to represent Traktor's camelot wheel notation
var initialPlaylist = [];

function storeTrack(playlist, title, num, key){
    playlist.push({title: title, num: num, key: key});
}

//given a playlist, this method creates a new playlist with matching or compatible songs
function listCompatible(playlist){

}

//testing below here
storeTrack(initialPlaylist, "Riders Of Rohan", 7, "m");
storeTrack(initialPlaylist, "Stargazer", 9, "m");
storeTrack(initialPlaylist, "Khepera", 7, "m");
storeTrack(initialPlaylist, "Slave (feat. Fisher)", 8, "m");
console.log(initialPlaylist);


