/*  Auteur: Samuel Dubé
    Date de création: 2018/01/02
    Date dernière modification: 201/01/11
    Description: Route pour le projet yelpcamp
*/

var express     = require("express"),
    router      = express.Router({mergeParams : true}),
    Campground  = require("../modules/campgrounds.js"),
    Comment     = require("../modules/comments.js"),
	middleware	= require("../middleware")
	
//Create Camp-Comment
router.post("/home/:id/newcomment", middleware.isLoggedIn ,function(req , res){
	Campground.findById(req.params.id , function(err , foundCamp){
		if(err){
			console.log(err);
		}else{

		Comment.create({author: req.user.username, comment: req.body.comment, avatar: req.user.avatar} , function(err , createdComment){
			if(err){
				console.log(err);
			}else{
				foundCamp.comments.push(createdComment._id);
				foundCamp.save();
				res.redirect("/home/" + req.params.id);
			}
		});
		}
	});
});
//Module Export to the main app
module.exports = router;