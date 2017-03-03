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

exports.move = function(req, res)
{

	console.log("Reached move route");

	var data = JSON.parse(JSON.stringify(req.body));



	var i = 0;
	var item
	while(data[i]) {
		console.log(data[i]);
		for(var key in groceries.groceries) {
			if(groceries.groceries[key].name.toUpperCase() == data[i].toUpperCase()){
					console.log("found a match");
					item = groceries.groceries[key];
					delete groceries.groceries[key];
					ingredients.ingredients.push(item);

					}
		}
		i++;
	}
}
	//res.json(req.body.data);

	// for (var key in groceries.groceries) {
	// 	console.log("Checking against an item");
	// 	console.log(groceries.groceries[key].name);
	// 	console.log("Parameter name");
	// 	console.log(req.params.name);
	// 		if(groceries.groceries[key].name.toUpperCase() == req.params.name.toUpperCase()){
	//
	// 			console.log("found a match");
	//
	// 			delete groceries.groceries[key];
	// 			ingredients.ingredients.push(item);
	//
	// 		}
  //   }
