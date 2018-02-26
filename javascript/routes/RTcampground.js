/*  Auteur: Samuel Dubé
    Date de création: 2018/01/02
    Date dernière modification: 201/01/11
    Description: Route pour le projet yelpcamp
*/

//Dependencies
var express     = require("express"),
	app			= express(), 	
    router      = express.Router({mergeParams : true}),
    Campground  = require("../modules/campgrounds.js"),
    bodyParser  = require("body-parser"),
    middleware	= require("../middleware"),
    multer		= require("multer"),
    mime		= require("mime")

// Multer Storage System
var storage = multer.diskStorage({
	destination: 'img/camp/',
	filename: function(req , file ,callback){
		callback(null, req.user.username  + Date.now() + '.' + mime.extension(file.mimetype));
	}
});
var upload = multer({ storage : storage});

//Initialisation and using
app.use(bodyParser.urlencoded({extended: true}));

//New Camp
router.get("/home/newcamp", middleware.isLoggedIn ,function(req, res) {
	res.render("camp/addcamp");
});
//Create Camp
router.post("/home/newcamp", middleware.isLoggedIn, upload.array("camp[information.img]",10), function(req, res){
	Campground.create(req.body.camp, function(err , camp){
		if(err){
			console.log(err);
		}else{
			for(var i = 0 ; i < req.files.length ; i++){
				camp.information.img.push(req.files[i]['filename']);
			}
			camp.information.author = req.user.username;
			camp.save();
			console.log("~New camp added by : " + req.user.username + "~");
			res.redirect("/home");
		}
	});
});
//Show Camp
router.get("/home/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err) {
			console.log(err);
		}
		else {
			res.render('camp/showcamp', {camp: foundCampground});
		}
	});
});
//Edit Camp
router.get("/home/:id/edit", middleware.isLoggedIn,  middleware.isOwnerCamp ,function(req , res){
	Campground.findById(req.params.id , function(err , foundCamp){
		if(err){
			console.log(err);
		}else{
			res.render("camp/editcamp" , {camp : foundCamp});
		}
	});
});
//Update Camp
router.put("/home/:id", middleware.isLoggedIn, middleware.isOwnerCamp , function(req , res){
	Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err , editedCamp){
		if(err){
			console.log(err);
		}else{
			res.redirect("/home/" + req.params.id);
		}
	});
});
//Delete Camp
router.delete("/home/:id", middleware.isLoggedIn , middleware.isOwnerCamp ,  function(req , res){
	Campground.findByIdAndRemove(req.params.id , function(err , deletedCamp){
		if(err){
			console.log(err);
		}else{
			res.redirect("/home");
		}
	});
});

//Module export to the main app.js
module.exports = router;