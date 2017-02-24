
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index');
};

exports.grocery = function(req, res) {
  res.render('grocery');
};

exports.inv = function(req, res) {
  res.render('inventory');
};

exports.calorie = function(req, res) {
  res.render('calorieTracker');
};

exports.meal = function(req, res) {
  res.render('meal');
};

exports.items = function(req, res) {
  res.render('bananas');
}

exports.items = function(req, res) {
	res.render('login');
}

exports.recipe = function(req, res) {
  res.render('recipe');
}
