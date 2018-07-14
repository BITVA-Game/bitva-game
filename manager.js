var profile =  require("./src/data/profile.json");

function msgReceived(arg){
	console.log("Have profile");
	return profile;
}

exports.msgReceived = msgReceived;