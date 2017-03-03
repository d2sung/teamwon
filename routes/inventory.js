var inventory = require('../ingredients.json');
// var inventory = require('../inventory.json'); TODO

exports.view = function(req, res) {
	console.log(inventory)
	res.render('inventory', inventory);
};

exports.decrement = function(req, res){
	res.json(inventory);

};

exports.increment = function(req, res){
	res.json(inventory);
}
