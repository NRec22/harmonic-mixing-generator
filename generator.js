//playlist objects have a number (1-12) and a key(m/d) to represent Traktor's camelot wheel notation.

var playlist = [];

function storeTrack(title, num, key){
    playlist.push({title: title, num: num, key: key});
}



//testing below here

storeTrack("Riders Of Rohan", 7, "m");
storeTrack("Khepera", 7, "m");
storeTrack("Slave (feat. Fisher)", 8, "m");
console.log(playlist);


