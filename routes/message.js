var express = require("express");
var router = express.Router({mergeParams: true});
var Conversation = require("../models/conversation");
var Message = require("../models/message");
var middleware = require("../middleware");

router.get("/message/:user", middleware.isLoggedIn, function(req, res){
	Conversation.create({peer_id: req.params.user}, function(err, newConversation){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			res.render("profile/message", {conversation: newConversation});
		}
	});
});

router.post("/message/:user/send", function(req, res){
	Conversation.findOne({})
});

module.exports = router;