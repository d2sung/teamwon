var sumCalories = 0;

$(document).ready(function() {
	initializePage();
})

function initializePage() {
  $.get("/recipesList", getRecipesList);

	$('#randomButton').click(random);
	$('#randomButton').click(randomButtonSend);
	$('#recipeThumbnail').click(recipesThumbnailSend);
}


function getRecipesList(result) {
  console.log(result);
  $.each( result['recipes'], function (index, value) {
		var temp = value.name.replace(/ /g, '');
    var htmlToInject = ' <a href="/recipe?name=' +
			temp + '" id="recipeThumbnail"> <div class="col-xs-6 col-md-4" id ="' + index +
    '"> <div class = "thumbnail"> <div class = "mealImage"> <img src = "' + value.imageURL +
    '" class="img-responsive center-block" alt="Responsive image"> </div>'  + value.name + '  </div> </div> </a>';

     $('#recipesList').append(htmlToInject);
   });

}

function random() {
	console.log("git here");
	var randomRecipe;
	$.ajax({
	         url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags=vegetarian%2Cdessert",
	         type: "GET",
	         headers: {'X-Mashape-Key': 'zhCsyskjhDmshg6pNzY9IE3hgCSHp1EhRlJjsntrI3Wx30m1kI',
				 			'Accept': 'application/json'
						},
						success: function (result){
							console.log("hehe");
								console.log(result);
								randomRecipe = result;
								$(location).attr('href', '/recipe2?id=' + randomRecipe.recipes[0].id);
								// $.get("/recipe?name=" + randomRecipe.recipes[0].title);
							}
	      });
	// $.get("/recipe?name=" + randomRecipe.recipes[0].title);
}

function randomButtonSend(){
	ga('send', 'event', 'randomRecipeButton' ,'click');
}

function recipesThumbnailSend() {
	ga('send', 'event', 'recipeThumbnail', 'click');
}
