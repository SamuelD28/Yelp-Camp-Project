/*  Auteur: Samuel Dubé
    Date de création: 2018/01/02
    Date dernière modification: ******
    Description: modele comments pour projet yelp
*/

var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
	author: String,
	comment: String,
	avatar: String,
	date: {
	    type: Date,
	    default: Date.now()
	}
});

module.exports = mongoose.model("Comment" , commentSchema);