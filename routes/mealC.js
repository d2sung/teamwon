var userData = require('../user.json');
exports.view = function(req, res) {
	res.render('mealC');
}

exports.getUserData = function(req, res) {
	res.json(userData);
};

exports.make = function(req, res) {
	res.render('make');
}

exports.congrats = function(req, res) {
	res.render('congrats');
}
