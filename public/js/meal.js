var sumCalories = 0;

$(document).ready(function() {
	initializePage();
})

function initializePage() {
  $.get("/recipesList", getRecipesList);

}


function getRecipesList(result) {
  console.log(result);
  $.each( result['recipes'], function (index, value) {
		var temp = value.name.replace(/ /g, '');
    var htmlToInject = '<div class="col-xs-6 col-md-4" id ="' + index +
    '"> <div class = "thumbnail"> <div class = "mealImage"> <img src = "' + value.imageURL +
    '" class="img-responsive center-block" alt="Responsive image"> </div> <a href="/recipe?name=' +
			temp + '"> ' + value.name + ' </a> </div> </div>';

     $('#recipesList').append(htmlToInject);
   });

}
