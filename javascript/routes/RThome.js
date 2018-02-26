/*  Auteur: Samuel Dubé
    Date de création: 2018/01/02
    Date dernière modification: 201/01/11
    Description: Route pour le projet yelpcamp
*/

var express     = require("express"),
    router      = express.Router({mergeParams : true}),
    Campground  = require("../modules/campgrounds.js")

// Index welcome page
router.get("/", function(req, res) {
	res.render("index");
});
// Index
router.get("/home", function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("home", {
				camp : campgrounds
			});
		}
	});
});
//Module export to the main app.js
module.exports = router;