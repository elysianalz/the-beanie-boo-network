var mongoose = require("mongoose");

var statusSchema = new mongoose.Schema({
	author:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	content: String,
	created: {type: Date, default: Date.now()},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

var Status = mongoose.model("Status", statusSchema);

module.exports = Status;