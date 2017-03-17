var sumCalories = 0;
var _name, _gluten, _dairy, _peanut, _egg, _sesame, _seafood, _shellfish, _soy, _sulfite, _tree_nut, _diet, _dislikes;
var _query, _cuisine, _calories, _ingredients, _difficulty;
var numIterated;
var mealIds;
var ingredientsList_local = [];
$(document).ready(function() {
	initializePage();
})

function initializePage() {
	mealIds = [];
	numIterated = 0;
  $.get("/userData", getUserName);
	$('#go').click(getRecipe);
	$('#startOver').click(refreshPage);
	$('#nextRecipeButton').click(nextRecipe);
	$.get("ingredientsList", getIngredientsList);
}

function getIngredientsList(result) {
	console.log(result);
	$.each( result['ingredients'], function (index, value) {
		ingredientsList_local.push({name: value.name, quantity: value.quantity
					   });
	});
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
	_difficulty = $('input[name="diff"]:checked').val();
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
			url+= "&number=1&offset=" + numIterated + "&query=" + newQuery + "&ranking=1&type=main+course";
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
								 $('#main-div').css("display", "none");
								 $('#afterContainer').css("display", "block");
								 console.log(data.results[0]);
								 var cuisine = "none";
								 if (data.results[0].cuisines[0]) {
									 cuisine = data.results[0].cuisines[0];
								 }
								 var htmlToInject = '<div id="scrollTo' + numIterated + '" align="center"> <h5>'
								 	+ data.results[0].title + '</h5>'
									+ '<img id="recipeImg" src="'
									+ data.results[0].image
									+ '" ></img>' + '</div> <div id="infoTable">'
									+ ' <table class="table table-responsive">'
									+ ' <thead> <tr> <th>Cuisine</th><th>Time To Make</th>'
									+ ' <th>Servings</th> </tr> </thead>'
									+ ' <tbody> <tr> <td>' + cuisine
									+ ' </td> <td>' + data.results[0].readyInMinutes
									+ ' minutes </td> <td>' + data.results[0].servings
									+ ' </tr> </tbody> </table> </div>'
									+ ' <div id="paddingTest' + numIterated + '"> <button align="center" display="none"'
									+ ' type="button" class="btn btn-primary" data-toggle="collapse"'
									+ ' data-target="#collapse'+ numIterated + '" aria-expanded="false" aria-controls="collapse">'
									+ ' Toggle Ingredients </button> <button id="makeButton'+ numIterated + '" align="center" display="none"'
									+ ' type="button" class="btn btn-success"> Make! </button></div>';
							 	 $('#afterContainer').append(htmlToInject);
								 $('#nextRecipe').css("display", "block");
								 $('#makeButton' + numIterated).click(goToMake);
								 mealIds[numIterated] = data.results[0].id;
								 var scrollTo = "#scrollTo" + numIterated;
								 if (numIterated != 0) {
    				 		   $('html, body').animate({
        	 				   scrollTop: $(scrollTo).offset().top - 70
    						   }, 2000);
								 }
								 url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + data.results[0].id + "/information?includeNutrition=false"
								 $.ajax({
					 							 url: url,
					 							 type: "GET",
					 							 data: {},
					 							 datatype: 'jsonp',
					 							 headers: {'X-Mashape-Key': 'zhCsyskjhDmshg6pNzY9IE3hgCSHp1EhRlJjsntrI3Wx30m1kI',
					 						 			'Accept': 'application/json'
					 								},
					 							 success: function (data){
					 								 console.log(data);
													 var htmlToInject = '<div class="collapse" id="collapse'+ numIterated + '">'
															+ '<div class="card card-block">';
													 for (var i = 0; i < data.extendedIngredients.length; i++) {
														 htmlToInject+='<p>';
														 var haveIngredient = 0;
														 for( var j = 0; j < ingredientsList_local.length; j++) {
															if(ingredientsList_local[j].name.toUpperCase() == data.extendedIngredients[i].name.toUpperCase() ){ 	 
														 		htmlToInject += '<span style="color:#00FF00"> &#10004 </span>';
															   	haveIngredient = 1;
															   }
									   
														}
														if (!haveIngredient){
															htmlToInject += '<span style="color:#F20000"> &#10004 </span>';	
														}
														 htmlToInject += data.extendedIngredients[i].originalString + '</p>';
													 }
													 htmlToInject+="</div></div>";
													 $('#afterContainer').append(htmlToInject);
					 								},
					 								beforeSend: function(xhr) {
					 		    					xhr.setRequestHeader("X-Mashape-Authorization", "zhCsyskjhDmshg6pNzY9IE3hgCSHp1EhRlJjsntrI3Wx30m1kI");
					 									xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); // Enter here your Mashape key
					 		    				}
					 						});
								},
								beforeSend: function(xhr) {
		    					xhr.setRequestHeader("X-Mashape-Authorization", "zhCsyskjhDmshg6pNzY9IE3hgCSHp1EhRlJjsntrI3Wx30m1kI");
									xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); // Enter here your Mashape key
		    				}
						});
		});
	});
}

function refreshPage() {
	location.reload();
}

function nextRecipe() {
	numIterated++;
	$('#afterContainer').append("</br>");
	getRecipe();
}

function goToMake(result) {

	var id = result.target.id;
	window.location.href = "/make/" + mealIds[id.substring(id.length - 1, id.length)];
}
