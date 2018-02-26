/*  Auteur: Samuel Dubé
    Date de création: 2018/01/02
    Date dernière modification: 2018/01/11
    Description: Fichier node.javascript pour le project yelp camp
*/

//<!------------------Dependencies-----------------------!>//
var express 				= require("express"),
	LocalStrategy			= require("passport-local"),
	passport				= require("passport"),
	passportLocalStrategy	= require("passport-local-mongoose"),
	app 					= express(),
	bodyParser  			= require("body-parser"),
	mongoose				= require("mongoose"),
	methodOverride			= require("method-override"),
	Campground				= require("./modules/campgrounds.js"),	//Model
	Comment 				= require("./modules/comments.js"), 	//Model
	User					= require("./modules/users.js"),		//Model
	RTcampground			= require("./routes/RTcampground.js"),	//Route
	RTcomment				= require("./routes/RTcomment.js"),		//Route
	RTlogin					= require("./routes/RTlogin.js"),		//Route
	RThome					= require("./routes/RThome.js")		//Route
	
//<!--------Initialization for user interaction---------!>//
app.use(require("express-session")({
		secret: "My little pony",
		resave: false,
		saveUninitialized: false
}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

//<!------------------Folder included------------------!>//
app.use(express.static("img"));
app.use(express.static("css"));
app.use(express.static("javascript"));

//<!------------------Various Module declaration------!>//
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(function(req , res , next){
	res.locals.user = req.user;
	next();
});

//<!------------------Routes-------------------------!>//
app.use(RThome);
app.use(RTcampground);
app.use(RTlogin);
app.use(RTcomment);

//<!------------------Listener-----------------------!>//
app.listen(process.env.PORT, process.env.IP , function(err){
	if(err){
		console.log(err);
		console.log("Something went wrong");
	}else{
		console.log("~Server started successfully~");
	}
});
