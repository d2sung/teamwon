var groceries = require('../grocery.json');

exports.groceryList = function(req, res) {

	res.json(groceries);
};
