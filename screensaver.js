var applescript = require('applescript');

var sleepScript =
	'tell application "System Events"\n\
		start current screen saver\n\
	end tell';

function screensaver() {
	applescript.execString( sleepScript , function( err, rtn ){
		console.log("[BioLock]: screensaver Error: " + err);
	});

}

module.exports = screensaver;