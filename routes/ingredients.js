var ingredients = require('../ingredients.json');

exports.ingredientsList = function(req, res) {
	// get a random palette from the top ones
	console.log("route returning ingredients list");
	res.json(ingredients);
};
