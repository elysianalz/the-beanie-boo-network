var express = require("express");
var router = express.Router({mergeParams: true});
//var Follow = require("../models/follow");
var User = require("../models/user");

//follow a user route
router.post("/profile/:user/follow", function(req, res){
	User.findById(req.params.user, function(err, foundUser){
		if(err){
			console.log(err);
			res.redirect("back");
		} else{
			User.findById(req.user._id, function(err, userCurrent){
				if(err){
					console.log(err);
					res.redirect("back");
				} else {
					userCurrent.following.push(foundUser._id);
					userCurrent.save();
					foundUser.followers.push(userCurrent._id);
					foundUser.save()
					res.redirect("back");
				}
			});
		}
	});
});

//unfollow a user route
router.post("/profile/:user/unfollow", function(req, res){ //post needs to be changed to delete - method-override bug - fixed for now
	User.findById(req.user._id).populate("following").exec(function(err, userCurrent){
		if(err || !userCurrent){
			res.redirect("back");
		} else {

			//remove current user from followers
			User.findById(req.params.user, function(err, foundUser){
				if(err || !foundUser){
					console.log(err.message);
					res.redirect("back");
				} else {
					console.log(foundUser);
					foundUser.followers.forEach(function(user){
						console.log("user"+user);
						if(user.equals(req.user._id)){
							var position = foundUser.followers.indexOf(user);
							foundUser.followers.splice(position, 1);
							foundUser.save();
							console.log("user removed");
						}
					});
				}
			});

			//remove found user from		
			userCurrent.following.forEach(function(user){
				if(user._id.equals(req.params.user)){
					var position = userCurrent.following.indexOf(user);
					userCurrent.following.splice(position, 1);
					userCurrent.save();
				}
			});
			res.redirect("back");
		}
	});

	/*Follow.find({"following" : req.params.user, "follower" : req.user._id}, function(err, foundFollow){
		if(err){
			console.log(err);
			res.redirect("back");
		}
	}).remove(function(err, info){ // remove function deletes the follow but does not remove from the users followers or following
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			console.log(info);
			res.redirect("back");
		}
	});*/
});

module.exports = router;