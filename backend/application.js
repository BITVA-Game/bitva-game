var app = require("./data/app.json");


function profileHandler(app, message){
	return app.profile;
}

function managerHandler(app, message){
	return app.manager;
}

function gameHandler(app, message){
	return app.game;
}

// This function is called from main.js 
// It redirects the message to all handlers
// Only those that have relevatn state will be updated
function msgReceived(message, sendReply){
	newApp = 
	{
		profile: profileHandler(app, message),
		manager: managerHandler(app, message),
		game: gameHandler(app, message)
	}
	sendReply(newApp);
	app = newApp;
}

function setApp(newApp){
	app = newApp;
}

/************* Exports ***************/
exports.msgReceived = msgReceived;
exports.setApp = setApp;
