var applescript = require('applescript');

var sleepScript =
	'tell application "System Events"\n\
		sleep\n\
	end tell';

function sleep() {
	applescript.execString(sleepScript, function(err, rtn){
		if(err){
			console.log("[BioLock]: screensaver Error: " + err);
		}
	});

}

module.exports = sleep;