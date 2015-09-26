//playlist objects have a number (1-12) and a key(m/d) to represent Traktor's camelot wheel notation
var initialPlaylist = [];

function storeTrack(playlist, title, num, key){
    playlist.push({title: title, num: num, key: key});
}

//given a song, this method creates a new playlist with matching or compatible songs
function listCompatible(playlist){
    var newList = [];
    var firstTrack = playlist.shift()

    newList.push(firstTrack);

    for(var i = 0; i < playlist.length; i++){
        if(firstTrack.num == playlist[i].num && firstTrack.key == playlist[i].key){
            newList.push(playlist[i]);
        }
    }


    return newList;
}

//testing below here
storeTrack(initialPlaylist, "Riders Of Rohan", 7, "m");
storeTrack(initialPlaylist, "Stargazer", 9, "m");
storeTrack(initialPlaylist, "Gamemaster", 2, "m");
storeTrack(initialPlaylist, "Khepera", 7, "m");
storeTrack(initialPlaylist, "Slave (feat. Fisher)", 8, "m");
console.log("Initial Playlist");
console.log(initialPlaylist);

console.log("Matching number and key with first song");
console.log(listCompatible(initialPlaylist));

