var userData = require('../user.json');
exports.view = function(req, res) {
	res.render('mealC');
}

exports.getUserData = function(req, res) {
	res.json(userData);
};
