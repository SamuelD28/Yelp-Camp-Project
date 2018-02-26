/*  Auteur: Samuel Dubé
    Date de création: 2018/01/02
    Date dernière modification: 2018/01/11
    Description: Fichier node.javascript pour les middleware du projet yelp_camp
*/

//Dependencies
var     Campground  = require("../modules/campgrounds"),
        back        = require("express-back")
var middleware = {
    //Verify credentials
    isLoggedIn : function(req , res , next){
            	if(req.isAuthenticated()){
            		return next();
            	}else{
            	    res.redirect("/home");}
                },
    isOwnerCamp :   function(req, res, next){
        Campground.findById(req.params.id , function(err , foundCamp){
                if(err){
                    console.log("~Can't find camp");
                    console.log(err);
                }
                if(foundCamp.information.author == req.user.username){
                    next();
                }
                else{
                    console.log("~You don't have permission");
                    //Redirect back ne fonctionne pas
                    return res.redirect("/home");
                }
        })
    }
}

module.exports = middleware;