/*  Auteur: Samuel Dubé
    Date de création: 2018/01/02
    Date dernière modification: 201/01/11
    Description: Route pour le projet yelpcamp
*/

var express     = require("express"),
	app			= express(),
    router      = express.Router({mergeParams : true}),
    passport    = require("passport"),
    User        = require("../modules/users.js"),
    Campground  = require("../modules/campgrounds.js"),
    middleware	= require("../middleware"),
    multer		= require("multer"),
    bodyParser	= require("body-parser")

//Multer storage system
var storage = multer.diskStorage({
	destination: "img/avatar/",
	filename: function(err , file , callback){
		if(err){
			console.log(err);
		}
		callback(null, file.originalname);
	}
});
var upload = multer({storage : storage});

//Initialisation and using
app.use(bodyParser.urlencoded({extended: true}));

//New Profil is a modal box located in partials/login.ejs

//Create Profil
router.post("/register", function(req , res){
	User.register(new User(
		{username: req.body.username,
		 email : req.body.email,
		 firstname : req.body.firstname,
		 lastname : req.body.lastname
		}),req.body.password, 
	function(err , user){
		if(err){
			console.log(err);
			return res.redirect("/");
		}else{
			console.log("~User added~");
			passport.authenticate("local")(req , res , function(){
			res.redirect("back");
			});
		}
	});
});
//Show Profil
router.get("/profil/:id", function(req , res){
	User.findById(req.user._id , function(err , foundUser){
		if(err){
			console.log(err);
		}else{
			Campground.find({ 'information.author' : foundUser.username}, function(err , foundCamp){
				if(err){
					console.log(err);
					console.log("~Can't find user camps")
				}else{
				res.render("profil/showProfil" , {user : foundUser , camp : foundCamp});
				}
			});
		}
	});	
});
//Edit Profil
router.get("/profil/:id/edit", function(req ,res){
	User.findById(req.params.id , function(err , foundUser){
		if(err){
			console.log(err);
		}else{
			res.render("profil/editProfil" , {user : foundUser});
		}
	});	
});
//Update Profil
router.put("/profil/:id", upload.single("updated[avatar]"), function(req , res){
	User.findByIdAndUpdate(req.params.id, req.body.updated , function(err , updatedUser){
		if(err){
			console.log(err);
		}else{
			updatedUser.avatar = req.file['filename'];
			updatedUser.save();
			res.redirect("/profil/" + req.params.id);
		}
	});
});
//Delete Profil

//Login
router.post("/login", passport.authenticate("local" , {
	successRedirect: "back",
	failureRedirect: "/home"
	}) ,function(req , res){
});
//Logout
router.get("/logout" , function(req , res){
	req.logout();
	res.redirect("back");
});
//Module export to the main app.js
module.exports = router;