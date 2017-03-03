var userData = require('../user.json');
exports.view = function(req, res) {
	res.render('mealB');
}

exports.getUserData = function(req, res) {
	res.json(userData);
};
