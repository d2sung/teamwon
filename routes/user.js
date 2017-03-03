var user = require('../user.json');

exports.update = function(req, res) {

	var data = JSON.parse(JSON.stringify(req.body));

	console.log(user.users[0].intolerances);
	if (data.dairy == 'true') {
		user.users[0].intolerances.dairy = 'true';
	}
	if (data.gluten == 'true') {
		user.users[0].intolerances.gluten = 'true';
	}
	// console.log(data);

	console.log(user.users[0].intolerances);
	res.render('grocery');
	// console.log(res);
	// user.users[0].intolerances.gluten =
	// delete groceries.groceries[key];
	// ingredients.ingredients.push(item);
};
