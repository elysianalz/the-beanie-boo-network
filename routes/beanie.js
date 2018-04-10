var express = require("express");
var router = express.Router({mergeParams: true});
var mongoose = require("mongoose");
var User = require("../models/user");
var Beanie = require("../models/beanie");
var middleware = require("../middleware");
var request = require("request");
var bodyParser = require("body-parser");

router.get("/profile/beanie/new",middleware.isLoggedIn, function(req, res){
	res.render("profile/newbeanie");
});

router.post("/profile/beanie/new", middleware.isLoggedIn, function(req, res){
	Beanie.create(req.body.beanie, function(err, newBeanie){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			console.log(newBeanie);
			req.user.beanies.push(newBeanie);
			req.user.save();
			res.redirect("/profile");
		}
	});
});

module.exports = router;