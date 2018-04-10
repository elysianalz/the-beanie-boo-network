var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var Status = require("../models/status");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//show profile page route
router.get("/profile", middleware.isLoggedIn, function(req, res){
	User.findById(req.user._id).populate("statuses").exec(function(err, foundUser){
		if(err){
			console.log(err);
		} else {
			var userID = req.user._id;
			Status.find({"author.id": req.user._id}).populate("comments").exec(function(err, foundStatuses){
				if(err){
					conosole.log(err);
					res.redirect("back");
				} else {
					res.render("profile/profile", {user: foundUser, statuses: foundStatuses});
				}
			});
		}
	});
});

//get user profile
router.get("/profile/:user", middleware.isLoggedIn, function(req, res){ //change user to variable --comment while drunk-- i cant figure it out thank you sober me :')
	User.findOne({"username": req.params.user}).populate("statuses").populate("followers").exec(function(err, foundUser){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			Status.find({"author.id": foundUser._id}).populate("comments").exec(function(err, foundStatuses){
				if(err){
					console.log(err);
					res.redirect("back");
				} else {
					res.render("profile/profile", {user: foundUser, statuses: foundStatuses});
				}
			});
		}
	});
});

//make a status route
router.post("/profile/status/new",middleware.isLoggedIn, function(req, res){
	Status.create(new Status(req.body.status), function(err, newStatus){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			newStatus.author.id = req.user._id;
			newStatus.author.username = req.user.username;
			newStatus.save();
			req.user.statuses.push(newStatus);
			req.user.save();
			res.redirect("/profile");
		}
	});
});

//comment on a status route
router.post("/profile/:status/new/comment", middleware.isLoggedIn, function(req, res){
	Status.findById(req.params.status, function(err, foundStatus){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			Comment.create(req.body.comment, function(err, newComment){
				if(err){
					console.log(err);
					res.redirect("back");
				} else {
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();
					req.user.comments.push(newComment);
					req.user.save();
					foundStatus.comments.push(newComment);
					foundStatus.save();
					console.log(newComment);
					res.redirect("/profile");
				}
			});
		}
	});
});

module.exports = router;