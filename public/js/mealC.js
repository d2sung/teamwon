var sumCalories = 0;
var _name, _gluten, _dairy, _peanut, _egg, _sesame, _seafood, _shellfish, _soy, _sulfite, _tree_nut, _diet, _dislikes;
var _query, _cuisine, _calories, _ingredients;

$(document).ready(function() {
	initializePage();
})

function initializePage() {
  $.get("/userData", getUserName);
	$('#go').click(getRecipe);
}


function getUserName(result) {
  console.log(result);
  $.each( result['users'], function (index, value) {
		console.log(index);
		console.log(value);
		document.getElementById("userName").innerHTML = "Hello " + value.name + "! Welcome to meal planning. Please select some options below and we'll find a meal for you.";
		_name = value.name;
		_gluten = value.intolerances.gluten;
		_dairy= value.intolerances.dairy;
		_peanut= value.intolerances.peanut;
		_egg= value.intolerances.egg;
		_sesame= value.intolerances.sesame;
		_seafood= value.intolerances.seafood;
		_shellfish= value.intolerances.shellfish;
		_soy= value.intolerances.soy;
		_sulfite= value.intolerances.sulfite;
		_tree_nut= value.intolerances.tree_nut;
		_diet = value.diet;
		_dislikes = value.dislikes;
	});
}

function getRecipe() {
	console.log("hehe");
	_query = document.getElementById("query").value;
	console.log("query is: " + _query);
	_cuisine = document.getElementById("cuisine").value;
	_calories = document.getElementById("calories").value;
	_ingredients = document.getElementById("ingredients").value;
	$.get("/userData", function (result) {
		console.log("hehex2");
		$.each( result['users'], function (index, value) {
			console.log("got here");
			console.log("query is: " + _query);
			var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=true";
			if (_cuisine) {
				url+= "&cuisine=" + _cuisine;
			}
			if (value.diet != "none") {
				url+= "&diet=" + value.diet;
			}
			if (value.dislikes != "none") {
				var inputString = '';
				var diet = value.dislikes.split(/[ ,]+/);
				for (var j = 0; j < diet.length; j++) {
					inputString+= diet[j] + "%2C+";
				}
				inputString.substring(0,inputString.length - 4);
				url+= "&diet=" + inputString;
			}
			url+= "&fillIngredients=false";
			if (_ingredients) {
				var inputString = '';
				var ing = _ingredients.split(/[ ,]+/);
				for (var j = 0; j < ing.length; j++) {
					inputString+= ing[j] + "%2C+";
				}
				inputString.substring(0,inputString.length - 4);
				url+= "&includeIngredients=" + inputString;
			}
			url+= "&instructionsRequired=true";
			var int = false;
			var intString = "&intolerances=";
			if (value.intolerances.gluten == "true") {
				intString+= "gluten%2C+";
				int = true;
			}
			if (value.intolerances.dairy == "true") {
				intString+= "dairy%2C+";
				int = true;
			}
			if (value.intolerances.peanut == "true") {
				intString+= "peanut%2C+";
				int = true;
			}
			if (value.intolerances.egg == "true") {
				intString+= "egg%2C+";
				int = true;
			}
			if (value.intolerances.sesame == "true") {
				intString+= "sesame%2C+";
				int = true;
			}
			if (value.intolerances.seafood == "true") {
				intString+= "seafood%2C+";
				int = true;
			}
			if (value.intolerances.shellfish == "true") {
				intString+= "shellfish%2C+";
				int = true;
			}
			if (value.intolerances.soy == "true") {
				intString+= "soy%2C+";
				int = true;
			}
			if (value.intolerances.sulfite == "true") {
				intString+= "sulfite%2C+";
				int = true;
			}
			if (value.intolerances.tree_nut == "true") {
				intString+= "tree+nut%2C+";
				int = true;
			}
			if (int) {
				url+= intString.substring(0, intString.length - 4);
			}
			url+= "&limitLicense=false";
			if (_calories) {
				url+= "&maxCalories=" + _calories;
			}
			var newQuery = _query.split(' ').join('+');
			url+= "&number=1&offset=0&query=" + newQuery + "&ranking=1&type=main+course";
      console.log(url);
			$.ajax({
							 url: url,
							 type: "GET",
							 data: {},
							 datatype: 'jsonp',
							 headers: {'X-Mashape-Key': 'zhCsyskjhDmshg6pNzY9IE3hgCSHp1EhRlJjsntrI3Wx30m1kI',
						 			'Accept': 'application/json'
								},
							 success: function (data){
								 console.log("GOT HERE");
								 console.log(data);
								 // console.log("result is: " + data.recipes[0]);
								 var htmlToInject = '<div> <h5>' + data.results[0].title + '</h5>' + '<img src="' + data.results[0].image + '" ></img>' + '</div> ';
							 	 $('#after').append(htmlToInject);
								},
								beforeSend: function(xhr) {
		    					xhr.setRequestHeader("X-Mashape-Authorization", "zhCsyskjhDmshg6pNzY9IE3hgCSHp1EhRlJjsntrI3Wx30m1kI");
									xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); // Enter here your Mashape key
		    				}
						});
		});
	});
}

function returnfunc() {

}
