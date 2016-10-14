var fs = require('fs');
var path = require('path');
var serialport = require('serialport');
var ready = false;
var config = JSON.parse(fs.readFileSync('settings.json'));
var myPort = new serialport(config.listener, {
    baudRate: config.baudRate,
    parser: serialport.parsers.readline("\r\n")
});

var unlock = require('./lib/unlockScript')(config.password);
var sleep = require('./lib/sleepScript');
console.log("[BioLock]: Loading...");

myPort.on('open', function(){
        console.log("[BioLock]: Initalized, listening on [" + config.listener + "]");
});
myPort.on('data', function(data){
    if(ready){
        if(data === "4bbde12ff3880"){
            console.log("[BioLock]: user authenticated");
            unlock();
            console.log("[BioLock]: Mac has been unlocked");
        } else {
            console.log("[BioLock]: User access denied");
        }
    }
    if(!ready){
        console.log("[BioLock]: " + data);
    }
    if(data === "done"){
        ready = true;
        sleep();
    }
});
myPort.on('close', function(){
    console.log("[BioLock]: Port closed.");
});
myPort.on('error', function(error){
    console.log("[BioLock]: There was an error: " + error);
});
