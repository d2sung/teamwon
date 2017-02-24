var ingredientsList_local = [];

$(document).ready(function() {
	initializePage();
})

function initializePage() {
  console.log("Recipe page called initializePage");
  $.get("/ingredientslist", getIngredientsList);
  $.get("/recipeInstructions", getRecipe);
}


function getRecipe(result) {
  console.log(result);
  var name = GetQueryStringParams('name');
  console.log(name);
  console.log(result);

  $.each( result['recipes'], function (index, value) {
    var tempName = value.name.replace(/ /g, '');

		for (var j = 0; j < ingredientsList_local.length; j++){
			console.log("local ingredients list");
			console.log(ingredientsList_local[j].name);
		}
		//match the url param to a recipe in the JSON
		if( tempName == name ) {
      //adding name and image to html
      var htmlToInject = '<div id ="' + index +
      '"> <h3> ' + value.name + ' </h3> <div class = "thumbnail"> <div class = "mealImage"> <img src = "' + value.imageURL +
      '" class="img-responsive center-block" alt="Responsive image"> </div> </div> ';
      //add ingredients to html
      htmlToInject += '<b>Ingredients</b>';
      htmlToInject += '<p>';
      for (var i = 0; i < value.ingredients.name.length ; i++ ){
				var haveIngredient = 0;
				console.log(value.ingredients.name[i]);
				for (var j = 0; j < ingredientsList_local.length; j++) {
					console.log(ingredientsList_local[j].name);
					if(ingredientsList_local[j].name.toUpperCase() == value.ingredients.name[i].toUpperCase() ) {
						console.log("Found a match in ingredient list");
						htmlToInject += '<span style="color:#00FF00">';
						haveIngredient = 1;
					}
				}
        htmlToInject += value.ingredients.quantity[i]  +' ' +  value.ingredients.name[i] + '<br>';
				if( haveIngredient ){
					htmlToInject += '</span>';
				}
			}
      htmlToInject += '</p>' + '<b>Directions</b> <p>';

      for (var i = 0; i < value.instructions.step.length; i++ ){
        htmlToInject += i+1 + ': ' + value.instructions.step[i] + '<br>';
      }

      htmlToInject += '</p></div>';

      // for(var k in value.ingredients.name) {
      //
      // }

       $('#recipeBody').append(htmlToInject);
   }
   });
}

function getIngredientsList(result) {
  console.log(result);
  $.each( result['ingredients'], function (index, value) {
		ingredientsList_local.push({name: value.name, quantity: value.quantity
    });
  });
  console.log(ingredientsList_local);
}

function GetQueryStringParams(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
