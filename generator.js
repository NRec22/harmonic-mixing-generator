//playlist objects have a number (1-12) and a key(A/B) to represent camelot wheel notation. NOTE: I use Traktor (m/d) for its respective notation

function storeTrack(playlist, title, num, key){
    playlist.push({title: title, num: num, key: key});
}

//check matching
function matchkey(key1, key2){
    return key1 == key2;
}

//4A <-> 4A
function sameNum(num1, num2){
    return num1 == num2;
}

//4A <-> 5A or 4B <-> 5B
function adjacentNum(num1, num2){
    if(num1 == num2 - 1 || num1 == num2 + 11){
        return true;
    }
    else if(num1 == num2 + 1 || num1 == num2 - 11){
        return true;
    }
    else{
        return false;
    }
}

//4A -> 6A or 4A -> 11A
function energyNum(num1, num2){
    if(num1 == num2 - 2 || num1 == num2 + 10){
        return true;
    }
    else if(num1 == num2 - 7 || num1 == num2 + 5){
        return true;
    }
    else{
        return false;
    }
}

//4A -> 3B or 4B -> 5A
function diagMix(num1, key1, num2, key2){
    if(num1 == num2 - 1 || num1 == num2 + 11){
        if(key1 == 'd' && key2 == 'm'){
            return true;
        }
        else{
            return false;
        }
    }
    else if(num1 == num2 + 1 || num1 == num2 - 11){
        if(key1 == 'm' && key2 == 'd'){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

//4A -> 7B or 4B -> 1A
function diagMix2(num1, key1, num2, key2){
    if(num1 == num2 - 3 || num1 == num2 + 9){
        if(key1 == 'm' && key2 == 'd'){
            return true;
        }
        else{
            return false;
        }
    }
    else if(num1 == num2 + 3 || num1 == num2 - 9){
        if(key1 == 'd' && key2 == 'm'){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

//Given a playlist, this method creates a new playlist with matching or compatible songs based on the first song.
function listCompatible(playlist){
    var newList = [];
    var firstTrack = playlist[0];

    newList.push(firstTrack);

    for(var i = 0; i < playlist.length; i++){
        //ex: 4A <-> 4A or 4A <-> 4B, easy
        if(sameNum(firstTrack.num, playlist[i].num) == true){
            newList.push(playlist[i]);
        }
        //ex: 4A <-> 5A, easy
        else if(adjacentNum(firstTrack.num, playlist[i].num) == true && matchkey(firstTrack.key, playlist[i].key) == true){
            newList.push(playlist[i]);
        }
        //: 4A -> 6A or 4A -> 11A, energy +2/+7
        else if(energyNum(firstTrack.num, playlist[i].num) == true && matchkey(firstTrack.key, playlist[i].key) == true){
            newList.push(playlist[i]);
        }
        //ex: 4A -> 3B or 4B -> 5A
        else if(diagMix(firstTrack.num, firstTrack.key, playlist[i].num, playlist[i].key) == true){
            newList.push(playlist[i]);
        }
        //ex: 4A -> 7B or 4B -> 1A
        else if(diagMix2(firstTrack.num, firstTrack.key, playlist[i].num, playlist[i].key) == true){
            newList.push(playlist[i]);
        }
    }
    newList.shift();
    return newList;
}

/*
Given a playlist, this method sorts the playlist prioritizing harmonic transitions first.
Works in a first come, first serve basis.
 */
function harmonicSort(playlist){
    var sortedList = [playlist.shift()];
    //WIP
    return sortedList;
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
storeTrack(initialPlaylist3, "whyyyy", 1, "d");
storeTrack(initialPlaylist3, "2005", 3, "m");
console.log("Initial Playlist 3");
console.log(initialPlaylist3);
console.log("Compatible with first song");
console.log(listCompatible(initialPlaylist3));

var initialPlaylist4 = initialPlaylist.concat(initialPlaylist2, initialPlaylist3);
console.log("Initial Playlist 4");
console.log(initialPlaylist4);
console.log("harmonic sort on Playlist 4");
console.log(harmonicSort(initialPlaylist4));

