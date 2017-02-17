var groceries = require('../grocery.json');
// var inventory = require('../inventory.json'); TODO

exports.groceryList = function(req, res) {

	res.json(groceries);
};

exports.removeGroceryItem = function(req, res) {
	//remove
	//refresh page
}
