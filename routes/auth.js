var express = require("express");
var passport = require("passport");
var router = express.Router({mergeParams: true});
var User = require("../models/user");

router.get("/register", function(req, res){
	res.render("auth/register");
});

router.post("/register", function(req, res){
	console.log("sending post request");
	User.register(new User({username: req.body.username}), req.body.password, function(err, newUser){
		if(err){
			console.log(err);
			console.log("error creating user");
			return res.render("auth/register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/home");
		});
	});
});

//login routes
router.get("/login", function(req, res){
	res.render("auth/login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/home",
	failureRedirect: "/login"
}), function(req, res){

});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

module.exports = router;