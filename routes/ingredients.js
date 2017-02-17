var ingredients = require('../grocery.json');

exports.ingredientsList = function(req, res) {
	// get a random palette from the top ones
	res.json(ingredients);
	}