var mongoose = require("mongoose");

var followSchema = new mongoose.Schema({
	following: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	follower: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

var Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;