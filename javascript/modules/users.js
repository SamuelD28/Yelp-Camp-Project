/*  Auteur: Samuel Dubé
    Date de création: 2018/01/02
    Date dernière modification: ******
    Description: Fichier js pour conserver les informatino utilisateur
*/

var mongoose                = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");

var userSchema  = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    avatar: String,
    campgrounds : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campground"
    }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User" , userSchema);