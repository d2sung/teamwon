var inventory = require('../ingredients.json');
// var inventory = require('../inventory.json'); TODO

exports.view = function(req, res) {
	res.render('inventory', inventory);
};

exports.inventoryList = function(req, res){
	res.json(inventory);
}


exports.decrement = function(req, res){
	for (var key in inventory.ingredients){
		if (inventory.ingredients[key].name.toUpperCase() == req.params.item.toUpperCase()){
			var quantity = inventory.ingredients[key].quantity;

			if (quantity > 0){
				inventory.ingredients[key].quantity = quantity - 1;
				res.render('inventory');
				console.log("decrement mothofucka");
			}
		}
	}
}


exports.increment = function(req, res){
	for (var key in inventory.ingredients){
		console.log(inventory.ingredients[key].name);
		console.log(req.params.item);
		if (inventory.ingredients[key].name.toUpperCase() == req.params.item.toUpperCase()){
			var quantity = parseInt(inventory.ingredients[key].quantity);
			inventory.ingredients[key].quantity = quantity + 1;

			console.log("increments mothofucka");
			res.render('inventory');
		}
	}
}

