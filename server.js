var fs = require('fs');
var path = require('path');
var serialport = require('serialport');
var ready = false;
var config = JSON.parse(fs.readFileSync('settings.json'));
var myPort = new serialport(config.listener, {
    baudRate: config.baudRate,
    parser: serialport.parsers.readline("\r\n")
});

console.log("[BioLock]: Loading...");

myPort.on('open', function(){
        console.log("[BioLock]: Initalized, listening on [" + config.listener + "]");
});
myPort.on('data', function(data){
    if(ready){
        console.log("[BioLock]: Received data");
        console.log("[BioLock]: " + data);
    }
    if(!ready){
        console.log("[BioLock]: " + data);
    }
    if(data === "done"){
        ready = true;
    }
});
myPort.on('close', function(){
    console.log("[BioLock]: Port closed.");
});
myPort.on('error', function(error){
    console.log("[BioLock]: There was an error: " + error);
});
