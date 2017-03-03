var groceries = require('../grocery.json');
var ingredients = require('../ingredients.json');

exports.groceryList = function(req, res) {

	res.json(groceries);
};

exports.addItem = function(req, res) {
  res.render('addItem');
};

exports.removeGroceryItem = function(req, res) {
	//remove
	//refresh page
}

exports.itemInfo = function(req, res)
{

	console.log("Reached itemInfo route");
	console.log(req.params);
	console.log(groceries.groceries);
	console.log(typeof "groceries");
	var item;

	for (var key in groceries.groceries) {
		console.log("Checking against an item");
		console.log(groceries.groceries[key].name);
		console.log("Parameter name");
		console.log(req.params.name);
			if(groceries.groceries[key].name.toUpperCase() == req.params.name.toUpperCase()){

				console.log("found a match");
				item = groceries.groceries[key];
				delete groceries.groceries[key];
				ingredients.ingredients.push(item);

			}
    }

}
