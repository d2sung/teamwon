var eaten = require('../eaten.json');
// var inventory = require('../inventory.json'); TODO

exports.eatenList = function(req, res) {
	res.json(eaten);
};
