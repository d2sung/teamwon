var data = require('../data.json');

exports.recipesList = function(req, res) {
	res.json(data);
};

exports.recipeInstructions = function(req, res) {
	console.log("Returning entire list");
	res.json(data);
};
