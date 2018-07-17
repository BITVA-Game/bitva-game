// import module for tests
const application = require("../backend/application");

// Mock sendReply function
const sendReply = jest.fn();


test('Game loaded. Send the app in its initial state', () =>{

	application.msgReceived("INITIAL", sendReply);
	expect(sendReply.mock.calls.length).toBe(1);
	expect(sendReply.mock.calls[0][0]).toEqual(
		{
			"profile": {
				"characters": ["Morevna", "Yaga"],
				"deck": ["apple", "mirror"],
				"coins": 5,
				"points": 0
			},
			"manager": {
				"screen": "STARTSCREEN"
			},
			"game": {
			
		}
	});

});