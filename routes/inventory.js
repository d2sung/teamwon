var inventory = require('../inventory.json');
// var inventory = require('../inventory.json'); TODO

exports.inventoryList = function(req, res) {

	res.json(inventory);
};
