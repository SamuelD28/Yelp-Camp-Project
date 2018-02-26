/*  Auteur: Samuel Dubé
    Date de création: 2018/01/02
    Date dernière modification: ******
    Description: modele campground pour projet yelp
*/

//Dependencies
var mongoose	= require("mongoose");
var Comment 	= require("./comments.js");

//Modèle campground
var campSchema = new mongoose.Schema({
	information : {
		author: String,
		name: String,
		img: [],
		typeCamping: String,
		minprice: Number,
		maxprice: Number,
		openmonth: String,
		openday: String,
		closemonth: String,
		closeday: String,
		desc: String
	},
	contact : {
		email: String,
		phone: String,
		website: String
	},
	location: {
		country: String,
		city: String,
		state: String,
		street: String,
		postal: String
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref : "Comment"
		}],
});

//Exportation du modèle
module.exports = mongoose.model("Campground", campSchema);
