var sumCalories = 0;
var _name, _gluten, _dairy, _peanut, _egg, _sesame, _seafood, _shellfish, _soy, _sulfite, _tree_nut, _diet, _dislikes;
var _query, _cuisine, _calories, _ingredients;
var numIterated;
var numPoints;

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$("#imDone").click(goHome);
  details();
}

function details() {
	var id = getId();
	$.ajax({
	         url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/information?includeNutrition=false",
	         type: "GET",
	         headers: {'X-Mashape-Key': 'zhCsyskjhDmshg6pNzY9IE3hgCSHp1EhRlJjsntrI3Wx30m1kI',
				 			'Accept': 'application/json'
						},
						success: function (data){
							console.log("result is: " + data.id);
				      //add ingredients to html

							var htmlToInject = '<div id="scrollTo" align="center"> <h5>'
							 + data.title + '</h5>'
							 + '<img id="recipeImg" src="'
							 + data.image
							 + '" ></img>' + '</div><div id="padding123"> <button align="center" display="none"'
							 + ' type="button" class="btn btn-primary" data-toggle="collapse"'
							 + ' data-target="#collapse" aria-expanded="false" aria-controls="collapse">'
							 + ' Ingredients </button></div>';
							 htmlToInject += '<div class="collapse" id="collapse">'
									+ '<div class="card card-block">';
							 for (var i = 0; i < data.extendedIngredients.length; i++) {
							   htmlToInject+='<p>' + data.extendedIngredients[i].originalString + '</p>';
							 }
							htmlToInject+="</div></div>";
							console.log(data.analyzedInstructions);
							var instructions = '<div class="container"><div class="row"><div class="col-xs-12">'
								+ '<ol class="list-group listlistlist">';
							for (var j = 0; j < data.analyzedInstructions[0].steps.length; j++) {
								instructions+='<li class="listlist list-group-item"> <p>'
									+ data.analyzedInstructions[0].steps[j].step + '</p> </li>';
							}
							instructions+='</ol></div></div></div>';
							$('#main-div').append(htmlToInject);
							$('#instructions-block').css("display", "block");
							$('#instructions').append(instructions);
							$('#imDone').css("display", "block");
							numPoints = data.spoonacularScore;
							}
	      });
  }

	function getId() {
	    var url = window.location.href.split('/');
	    return url[4];
	}

	function goHome() {
		window.location.href = "/congrats/" + numPoints;
	}
