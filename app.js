var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var request = require("request");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
var Beanie = require("./models/beanie");
var Post = require("./models/post");
var Comment = require("./models/comment");
var Conversation = require("./models/conversation");
var Message = require("./models/message");
//var Follow = require("./models/follow");
var app = express();

var authRoutes = require("./routes/auth");
var booboardRoutes = require("./routes/booboard");
var profileRoutes = require("./routes/profile");
var beanieRoutes = require("./routes/beanie");
var newsfeedRoutes = require("./routes/newsfeed");
var followRoutes = require("./routes/follow");
var messageRoutes = require("./routes/message");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.set(methodOverride("_method"));
app.use(express.static(__dirname+ "/public"));

mongoose.connect("mongodb://localhost:27017/beta3");

app.use(require("express-session")({
	secret: "beanie boos rock the world",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use(authRoutes);
app.use(booboardRoutes);
app.use(profileRoutes);
app.use(beanieRoutes);
app.use(newsfeedRoutes);
app.use(followRoutes);
app.use(messageRoutes);

app.listen(5000, function(){
	console.log("server running");
});
