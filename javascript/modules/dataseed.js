/*  Auteur: Samuel Dubé
    Date de création: 2018/01/02
    Date dernière modification: ******
    Description: Fichier js pour feed les data lors du lancement du serveur.
*/

//Dependencies
var mongoose		= require("mongoose");
var Comment 		= require("./comments.js");
var Campground		= require("./campgrounds.js");

//Starter data
var starterData = [{
	information : {
		name: "Salmon Creek",
		img: ["camp12.jpg","camp4.jpg","camp7.jpg"],
		typeCamping: "Resort",
		minprice: 89,
		maxprice: 111,
		openmonth: "July",
		openday: 2,
		closemonth: "October",
		closeday: 5,
		desc: "Au Camping Havana Resort vous retrouverez l’ambiance des plus grandes destinations vacances, piscine centrale, cantine cubaine sur un terrain de 263 acres pour terrains visiteurs pour tente, roulotte, motorisé, animation cubaine, etc. Situé à Maricourt dans les Cantons de l’Est, à 35 minutes de Sherbrooke et Drummondville et 1h15 de Montréal et sa Rive-Sud."
		},
	contact : {
		email: "samuel_personnel@outlook.com",
		phone: "15146886447",
		website: "salmon-creek.ca"
		},
	location: {
		country: "Canada",
		city: "Sainte-Catherine",
		state: "QC",
		street: "775 duparc",
		postal: "j5c 1j8"
		}
	},
	{
	information : {
		name: "Yellowstone National Park",
		img: ["camp13.jpg","camp5.jpg","camp8.jpg"],
		typeCamping: "Rv",
		minprice: 89,
		maxprice: 111,
		openmonth: "Mai",
		openday: 4,
		closemonth: "August",
		closeday: 28,
		desc: "Au Camping Havana Resort vous retrouverez l’ambiance des plus grandes destinations vacances, piscine centrale, cantine cubaine sur un terrain de 263 acres pour terrains visiteurs pour tente, roulotte, motorisé, animation cubaine, etc. Situé à Maricourt dans les Cantons de l’Est, à 35 minutes de Sherbrooke et Drummondville et 1h15 de Montréal et sa Rive-Sud."
		},
	contact : {
		email: "yellowstone-usa@outlook.com",
		phone: "14508457878",
		website: "yellowstone.ca"
		},
	location: {
		country: "United States",
		city: "Park county",
		state: "Wyoming",
		street: "yellowstone",
		postal: "j5c 197"
		}
	},

	{
	information : {
		name: "Jeesus Christian Park",
		img: ["camp1.jpg","camp6.jpg","camp2.jpg"],
		typeCamping: "Wilderness",
		minprice: 89,
		maxprice: 111,
		openmonth: "December",
		openday: 1,
		closemonth: "September",
		closeday: 31,
		desc: "Au Camping Havana Resort vous retrouverez l’ambiance des plus grandes destinations vacances, piscine centrale, cantine cubaine sur un terrain de 263 acres pour terrains visiteurs pour tente, roulotte, motorisé, animation cubaine, etc. Situé à Maricourt dans les Cantons de l’Est, à 35 minutes de Sherbrooke et Drummondville et 1h15 de Montréal et sa Rive-Sud."
		},
	contact : {
		email: "jeesus-christian@outlook.com",
		phone: "14388818842",
		website: "jeesus-park.ca"
		},
	location: {
		country: "Canada",
		city: "Montreal",
		state: "QC",
		street: "775 duparc",
		postal: "j5c 1j8"
		}
	}];

function Seed(){
	Comment.remove({} , function(err){
		if(err){
			console.log(err);
		}else{
			// console.log("Comments removed"); debugging only
		}
	})
	Campground.remove({} , function(err){
		if(err){
			console.log(err);
		}else{
			// console.log("Data destroyed"); debugging only
		}
			starterData.forEach(function(element){
			Campground.create(element , function(err , camp){
				if(err){
					console.log(err);
				}else{
					// console.log("Camp created"); debugging only
				}
				Comment.create(
					{ author : "Bob" , comment: "No speeches. Short speech. You lost your partner today. What's his name - Emilio? Emilio is going to prison. The DEA took all your money, your lab. You got nothing. Square one."},
					function(err , createdComment){
						if(err){
							console.log(err);
						}else{
							camp.comments.push(createdComment._id);
							camp.save();
						}
					});
			});
		});
		console.log("~Starter Data seeded successfully~");
	});
	
}
//Return
module.exports = Seed();