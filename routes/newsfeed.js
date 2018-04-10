var express = require("express");
var router = express.Router({mergeParams: true});
var mongoose = require("mongoose");
var User = require("../models/user");
var Status = require("../models/status");
var middleware = require("../middleware");
var users = [];

router.get("/newsfeed", middleware.isLoggedIn, function(req, res){
	User.findById(req.user._id, function(err, userCurrent){
		if(err || !userCurrent){
			console.log(err.message);
			res.redirect("back");
		} else {
			userCurrent.following.forEach(function(user){
				User.findById(user).populate("statuses").exec(function(err, foundUser){
					if(err){
						console.log(err);
						res.redirect("back");
					} else {
						console.log(foundUser);
						users.push(foundUser);
					}
				});
			});
			console.log(users);
			res.render("home/newsfeed", {users: users});
		}
	});

	/*User.find({"followers: follower" : req.user}, function(err, foundUsers){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			res.render("home/newsfeed", {users: foundUsers});
		}
	});*/
	
});

module.exports = router;

