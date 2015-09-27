//playlist objects have a number (1-12) and a key(A/B) to represent camelot wheel notation
//NOTE: Traktor uses (m/d) for its respective notation

function storeTrack(playlist, title, num, key){
    playlist.push({title: title, num: num, key: key});
}

//check matching
function matchkey(key1, key2){
    return key1 == key2;
}

//Given a playlist, this method creates a new playlist with matching or compatible songs based on the first song.
function listCompatible(playlist){
    var newList = [];
    var firstTrack = playlist.shift()

    newList.push(firstTrack);

    for(var i = 0; i < playlist.length; i++){
        //ex: 4A <-> 4A, easy
        if(firstTrack.num == playlist[i].num && matchkey(firstTrack.key, playlist[i].key) == true){
            newList.push(playlist[i]);
        }
        //ex: 4A <-> 5A, easy
        else if(firstTrack.num == playlist[i].num - 1 || playlist[i].num + 11 || playlist[i].num + 1 || playlist[i].num -11 && matchkey(firstTrack.key, playlist[i].key) == true) {
            newList.push(playlist[i]);
        }
        //ex: 4A <-> 4B, easy
        else if(firstTrack.num == playlist[i].num && matchkey(firstTrack.key, playlist[i].key) == false){
            newList.push(playlist[i]);
        }
        //ex: 4A -> 6A, energy +2
        else if(firstTrack.num == playlist[i].num - 2 || playlist[i].num + 10 && matchkey(firstTrack.key, playlist[i].key) == true){
            newList.push(playlist[i]);
        }
        //ex: 4A -> 11A, energy +7/-5
        else if(firstTrack.num == playlist[i].num - 7 || playlist[i].num + 5 && matchkey(firstTrack.key, playlist[i].key) == true){
            newList.push(playlist[i]);
        }
        //ex: 4A -> 3B or 4B -> 5A
        else if(firstTrack.num == playlist[i].num - 1 || playlist[i].num + 11 && matchkey(firstTrack.key, playlist[i].key) == false) {
            newList.push(playlist[i]);
        }
        //ex: 4A -> 7B or 4B -> 1A
        else if(firstTrack.num == playlist[i].num - 3 || playlist[i].num + 9 && matchkey(firstTrack.key, playlist[i].key) == false){
            newList.push(playlist[i]);
        }

    }
    newList.shift();
    return newList;
}

//testing below here
var initialPlaylist = [];
storeTrack(initialPlaylist, "Riders Of Rohan", 7, "m");
storeTrack(initialPlaylist, "Stargazer", 9, "m");
storeTrack(initialPlaylist, "Gamemaster", 2, "m");
storeTrack(initialPlaylist, "FAKE", 7, "d");
storeTrack(initialPlaylist, "FAKE2", 6, "d" );
storeTrack(initialPlaylist, "FAKE3", 10, "d");
storeTrack(initialPlaylist, "FAKE4", 6, "m");
storeTrack(initialPlaylist, "Khepera", 7, "m");
storeTrack(initialPlaylist, "Slave (feat. Fisher)", 8, "m");
console.log("Initial Playlist");
console.log(initialPlaylist);
console.log("Compatible with first song");
console.log(listCompatible(initialPlaylist));

var initialPlaylist2 = [];
storeTrack(initialPlaylist2, "here we go", 12, "m");
storeTrack(initialPlaylist2, "jump on it", 1, "m");
storeTrack(initialPlaylist2, "music and wine", 7, "m");
storeTrack(initialPlaylist2, "turn up the bass", 11, "d");
console.log("Initial Playlist 2");
console.log(initialPlaylist2);
console.log("Compatible with first song");
console.log(listCompatible(initialPlaylist2));

var initialPlaylist3 = [];
storeTrack(initialPlaylist3, "1999", 4, "d");
storeTrack(initialPlaylist3, "airlock", 5, "m");
storeTrack(initialPlaylist3, "detroit 12am", 1, "m");
//should not be compatible
storeTrack(initialPlaylist3, "inconceivable", 8, "d");
console.log("Initial Playlist 3");
console.log(initialPlaylist3);
console.log("Compatible with first song");
console.log(listCompatible(initialPlaylist3));



