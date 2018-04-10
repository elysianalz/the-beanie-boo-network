var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}],
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}],
	beanies: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Beanie"
	}],
	statuses:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Status"
	}],
	following:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	followers:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	conversations: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Conversation"
	}]
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

module.exports = User;