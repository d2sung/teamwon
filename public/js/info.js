$(document).ready(function() {
	initializePage();
})

function initializePage() {
  $('#continue').click(continuemk);

}

function continuemk() {
	var inputs = document.getElementsByTagName("input");
	var intolerances, diet, dislikes;
	var data = {};

	// intolerances
	if (inputs[0].value) {
		intolerances = inputs[0].value.split(/[ ,]+/);
		for (var i = 0; i < intolerances.length; i++) {
			if (intolerances[i] == 'dairy') {
				data['dairy'] = 'true';
			}
			if (intolerances[i] == 'peanut' || intolerances[i] == 'peanuts') {
				data['peanut'] = 'true';
			}
			if (intolerances[i] == 'egg' || intolerances[i] == 'eggs') {
				data['egg'] = 'true';
			}
			if (intolerances[i] == 'gluten' || intolerances[i] == 'gluten-free') {
				data['gluten'] = 'true';
			}
			if (intolerances[i] == 'sesame' || intolerances[i] == 'sesames') {
				data['sesame'] = 'true';
			}
			if (intolerances[i] == 'seafood' || intolerances[i] == 'fish') {
				data['seafood'] = 'true';
			}
			if (intolerances[i] == 'shellfish') {
				data['shellfish'] = 'true';
			}
			if (intolerances[i] == 'soy') {
				data['soy'] = 'true';
			}
			if (intolerances[i] == 'sulfite' || intolerances[i] == 'sulfites') {
				data['sulfite'] = 'true';
			}
			if (intolerances[i] == 'tree nut' || intolerances[i] == 'tree nuts') {
				data['tree_nut'] = 'true';
			}
			if (intolerances[i] == 'wheat') {
				data['wheat'] = 'true';
			}
			if (intolerances[i] == 'nut' || intolerances[i] == 'nuts') {
				data['tree_nut'] = 'true';
				data['peanut'] = 'true';
			}
		}
	}

	// diets
	if (inputs[1].value) {
		data['diet'] = inputs[1].value;
	}

	// dislikes
	if (inputs[2].value) {
		data['dislikes'] = inputs[2].value;
	}
	$.ajax({
		type: "POST",
		data: JSON.stringify(data),
		url: "/updateUser",
		contentType: "application/json",
	}).done(function() {
  	$.get('/grocery');
	});
}
