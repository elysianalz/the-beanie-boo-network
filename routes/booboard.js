var express = require("express");
var router = express.Router({mergeParams: true});
var Post = require("../models/post");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get('/', function(req, res){
	res.render("entry");
});

//home page
router.get('/home', middleware.isLoggedIn, function(req, res){
	Post.find({}, function(err, foundPosts){
		if(err){
			console.log(err);
		} else {
			res.render("home/index", {posts: foundPosts});
		}
	});	
});

//get create post route
router.get("/home/create", middleware.isLoggedIn, function(req, res){
	res.render("home/create");
});

//create post route
router.post("/home/create", middleware.isLoggedIn, function(req, res){
	Post.create(req.body.post, function(err, newPost){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			newPost.author.id = req.user._id;
			newPost.author.username = req.user.username;
			newPost.save();
			req.user.posts.push(newPost);
			req.user.save();
			console.log(newPost);
			res.redirect("/home/"+newPost._id);
		}
	});
});

//individual post route
router.get("/home/:id", middleware.isLoggedIn, function(req, res){
	Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			res.render("home/show", {post: foundPost});
		}
	});
});

//comment route
router.post("/home/:id/comment", middleware.isLoggedIn,function(req, res){
	Post.findById(req.params.id, function(err, foundPost){
		if(err){
			console.log("ERROR");
			res.redirect("back");
		} else {
			Comment.create(req.body.comment, function(err, newComment){
				if(err){
					console.log("ERROR");
					res.redirect("back");
				} else {
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();
					foundPost.comments.push(newComment);
					foundPost.save();
					req.user.comments.push(newComment);
					req.user.save();
					console.log(newComment);
					res.redirect("/home/"+foundPost._id);
				}
			});
		}
	});	
});

module.exports = router;