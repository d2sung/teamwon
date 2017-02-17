var data = require('../data.json');
// var inventory = require('../inventory.json'); TODO

exports.recipes = function(req, res) {

	res.json('meal', data);
};
