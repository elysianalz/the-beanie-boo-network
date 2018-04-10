var mongoose = require("mongoose");

var conversationSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	peer_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	messages: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Message"
	}]
});

var Conversation  = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;