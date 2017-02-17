var groceries = require('../grocery.json');

exports.groceryList = function(req, res) {
	// get a random palette from the top ones
	res.json(groceries);
	}