var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	content: String,
	created: {type: Date, default: Date.now()}
});

var Message = mongoose.model("Message", messageSchema);

module.exports = Message;