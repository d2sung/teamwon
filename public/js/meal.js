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
    var htmlToInject = '<div class="col-xs-6 col-md-4" id ="' + index + 
    '"> <div class = "thumbnail"> <div class = "mealImage"> <img src = "' + value.imageURL +
    '" class="img-responsive center-block" alt="Responsive image"> </div> <h5>' + value.name + '</h5> </div> </div>';

     $('#recipesList').append(htmlToInject);
   });

}