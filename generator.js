/*playlist objects have a number (1-12) and a key(A/B) to represent camelot wheel notation.
NOTE: I use Traktor (m/d) for its respective notation.
 */

//stores into a playlist
function storeTrack(playlist, title, num, key){
    playlist.push({title: title, num: num, key: key});
}

//check matching
function matchkey(key1, key2){
    return key1 === key2;
}

//4A <-> 4A
function sameNum(num1, num2){
    return num1 === num2;
}

//4A <-> 5A or 4B <-> 5B
function adjacentNum(num1, num2){
    if(num1 === num2 - 1 || num1 === num2 + 11){
        return true;
    }
    else if(num1 === num2 + 1 || num1 === num2 - 11){
        return true;
    }
    else{
        return false;
    }
}

//4A -> 6A or 4A -> 11A
function energyNum(num1, num2){
    if(num1 === num2 - 2 || num1 === num2 + 10){
        return true;
    }
    else if(num1 === num2 - 7 || num1 === num2 + 5){
        return true;
    }
    else{
        return false;
    }
}

//4A -> 3B or 4B -> 5A
function diagMix(num1, key1, num2, key2){
    if(num1 === num2 - 1 || num1 === num2 + 11){
        if(key1 === 'd' && key2 === 'm'){
            return true;
        }
        else{
            return false;
        }
    }
    else if(num1 === num2 + 1 || num1 === num2 - 11){
        if(key1 === 'm' && key2 === 'd'){
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
    if(num1 === num2 - 3 || num1 === num2 + 9){
        if(key1 === 'm' && key2 === 'd'){
            return true;
        }
        else{
            return false;
        }
    }
    else if(num1 === num2 + 3 || num1 === num2 - 9){
        if(key1 === 'd' && key2 === 'm'){
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

//given two songs, returns whether they can be harmonically mixed
function checkCompatible(num1, key1, num2, key2){
    if(sameNum(num1, num2) === true){
        return true;
    }
    else if(adjacentNum(num1, num2) === true && matchkey(key1, key2) === true){
        return true;
    }
    else if(energyNum(num1, num2) === true && matchkey(key1, key2) === true){
        return true;
    }
    else if(diagMix(num1, key1, num2, key2) === true){
        return true;
    }
    else if(diagMix2(num1, key1, num2, key2) === true){
        return true;
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
        if(checkCompatible(firstTrack.num, firstTrack.key, playlist[i].num, playlist[i].key)){
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
    var sortedPlaylist = [playlist.shift()];

    return harmonicSortHelper(sortedPlaylist, playlist);
}

//helper function for harmonicSort which loops through itself
function harmonicSortHelper(sortlist, unsortlist){

    for(var i = 0; i < unsortlist.length; i++){
        if(checkCompatible(sortlist[sortlist.length - 1].num, sortlist[sortlist.length - 1].key, unsortlist[i].num, unsortlist[i].key)) {
            sortlist.push(unsortlist[i]);
            unsortlist.splice(i, 1);
            harmonicSortHelper(sortlist, unsortlist);
        }
        else if(i === unsortlist.length -1){
            sortlist.push(unsortlist.shift());
            harmonicSortHelper(sortlist, unsortlist);
        }
    }
    return sortlist;
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
//console.log(initialPlaylist);
console.log("Compatible with first song");
console.log(listCompatible(initialPlaylist));

var initialPlaylist2 = [];
storeTrack(initialPlaylist2, "here we go", 12, "m");
storeTrack(initialPlaylist2, "jump on it", 1, "m");
storeTrack(initialPlaylist2, "music and wine", 7, "m");
storeTrack(initialPlaylist2, "turn up the bass", 11, "d");
console.log("Initial Playlist 2");
//console.log(initialPlaylist2);
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
//console.log(initialPlaylist3);
console.log("Compatible with first song");
console.log(listCompatible(initialPlaylist3));

var initialPlaylist4 = initialPlaylist.concat(initialPlaylist2, initialPlaylist3);
console.log("Initial Playlist 4");
//console.log(initialPlaylist4);
console.log("harmonic sort on Playlist 4");
var sortedPlaylist4 = harmonicSort(initialPlaylist4);
console.log(sortedPlaylist4);

var initialPlaylist5 = [];
storeTrack(initialPlaylist5, "timeless", 7, "m");
storeTrack(initialPlaylist5, "for the moment", 6, "m");
storeTrack(initialPlaylist5, "skylark", 3, "d");
storeTrack(initialPlaylist5, "synthetic", 8, "m");
storeTrack(initialPlaylist5, "numb the pain", 7, "m");
storeTrack(initialPlaylist5, "on fire", 4, "m");
storeTrack(initialPlaylist5, "one special", 3, "d");
storeTrack(initialPlaylist5, "falling", 1, "m");
storeTrack(initialPlaylist5, "pieces orig", 6, "m");
storeTrack(initialPlaylist5, "pieces remix", 5, "d");
storeTrack(initialPlaylist5, "dfrnt", 10, "d");
storeTrack(initialPlaylist5, "for an angel", 12, "m");
storeTrack(initialPlaylist5, "buckle up", 3, "m");
storeTrack(initialPlaylist5, "confusia", 7, "m");
storeTrack(initialPlaylist5, "walking clouds", 3, "m");
storeTrack(initialPlaylist5, "locked up", 6, "m");
storeTrack(initialPlaylist5, "emotion", 1, "m");
storeTrack(initialPlaylist5, "muse", 10, "m");
storeTrack(initialPlaylist5, "i can breathe", 9, "d");
storeTrack(initialPlaylist5, "crush", 12, "m");
storeTrack(initialPlaylist5, "sirens remix", 12, "m");
storeTrack(initialPlaylist5, "600", 2, "m");
storeTrack(initialPlaylist5, "spiral", 4, "d");
storeTrack(initialPlaylist5, "air for life", 6, "m");
console.log("Initial Playlist 5");
//console.log(initialPlaylist5);
console.log("harmonic sort of Playlist 5");
console.log(harmonicSort(initialPlaylist5));

var initialPlaylist6 = [];
storeTrack(initialPlaylist6, "7m-1", 7, "m");
storeTrack(initialPlaylist6, "5m-1", 5, "m");
storeTrack(initialPlaylist6, "6m-1", 6, "m");
storeTrack(initialPlaylist6, "4m-1", 4, "m");
storeTrack(initialPlaylist6, "4m-2", 4, "m");
storeTrack(initialPlaylist6, "6m-2", 6, "m");
storeTrack(initialPlaylist6, "10m-1", 10, "m");
storeTrack(initialPlaylist6, "10m-2", 10, "m");
storeTrack(initialPlaylist6, "9m-1", 9, "m");
console.log("Initial Playlist 6");
//console.log(initialPlaylist6);
console.log("harmonic sort of Playlist 6");
console.log(harmonicSort(initialPlaylist6));
