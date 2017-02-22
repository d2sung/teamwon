var data = require('../data.json');

exports.recipesList = function(req, res) {
	res.json(data);
};
