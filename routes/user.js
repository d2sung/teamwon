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
	if (data.peanut == 'true') {
		user.users[0].intolerances.peanut = 'true';
	}
	if (data.egg == 'true') {
		user.users[0].intolerances.egg = 'true';
	}
	if (data.sesame == 'true') {
		user.users[0].intolerances.sesame = 'true';
	}
	if (data.soy == 'true') {
		user.users[0].intolerances.soy = 'true';
	}
	if (data.seafood == 'true') {
		user.users[0].intolerances.seafood = 'true';
	}
	if (data.shellfish == 'true') {
		user.users[0].intolerances.shellfish = 'true';
	}
	if (data.sulfite == 'true') {
		user.users[0].intolerances.sulfite = 'true';
	}
	if (data.tree_nut == 'true') {
		user.users[0].intolerances.tree_nut = 'true';
	}
	if (data.diet) {
		user.users[0].diet = data.diet;
	}
	if (data.dislikes) {
		user.users[0].dislikes = data.dislikes;
	}
	// console.log(data);

	console.log(user.users[0]);
	res.render('grocery');
	// console.log(res);
	// user.users[0].intolerances.gluten =
	// delete groceries.groceries[key];
	// ingredients.ingredients.push(item);
};
