var sumCalories = 0;

$(document).ready(function() {
	initializePage();
})

function initializePage() {
  $.get("/userData", getUserData);
	// $.get()
	$('#randomButton').click(random);
	$('#randomButton').click(newRecipeSend);
}


function getUserData(result) {
  console.log(result);
  $.each( result['users'], function (index, value) {
		console.log(index);
		console.log(value);
		var intolerances = '';
		console.log(value.intolerances);
		console.log(value.intolerances.dairy);
		var int = false;
		if (value.intolerances.gluten == "true") {
			intolerances+=' gluten,';
			int = true;
		}
		if (value.intolerances.dairy == "true") {
			intolerances+=' dairy,';
			int = true;
		}
		console.log(intolerances);
		intolerances = intolerances.substring(0, intolerances.length - 1);
		var htmlToInject;
		if (int) {
    	htmlToInject = '<div> <p> We pulled the following recipe for you based on your'
			+ ' intolerance(s) to:' + intolerances + '</div> ';
		}
    $('#textContainer').append(htmlToInject);
		// $.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?intolerances=peanut%2C+shellfish', returnfunc);

	});
	console.log("fuck");
	$.ajax({
					 url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=true&cuisine=american&excludeIngredients=coconut%2C+mango&fillIngredients=false&includeIngredients=onions%2C+lettuce%2C+tomato&instructionsRequired=false&intolerances=dairy%2C+gluten&limitLicense=false&maxCalories=1500&maxCarbs=100&maxFat=100&maxProtein=100&minCalories=150&minCarbs=5&minFat=5&minProtein=5&number=1&offset=0&query=burger&ranking=1&type=main+course",
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
					 	 $('#textContainer').append(htmlToInject);
						},
						beforeSend: function(xhr) {
    					xhr.setRequestHeader("X-Mashape-Authorization", "zhCsyskjhDmshg6pNzY9IE3hgCSHp1EhRlJjsntrI3Wx30m1kI");
							xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); // Enter here your Mashape key
    				}
				});
}

function returnfunc() {

}

function random() {
	console.log("git here");
	var randomRecipe;
	$.ajax({
					 url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags=gluten_free%2Cdairy_free",
					 type: "GET",
					 data: {},
					 datatype: 'jsonp',
					 headers: {'X-Mashape-Key': 'zhCsyskjhDmshg6pNzY9IE3hgCSHp1EhRlJjsntrI3Wx30m1kI',
				 			'Accept': 'application/json'
						},
					 success: function (data){
						 console.log("result is: " + data.recipes[0]);
						 var htmlToInject = '<div> <h5>' + data.recipes[0].title + '</h5>' + '<img src="' + data.recipes[0].image + '" ></img>' + '</div> ';
					 	 $('#textContainer').append(htmlToInject);
						},
						beforeSend: function(xhr) {
    					xhr.setRequestHeader("X-Mashape-Authorization", "zhCsyskjhDmshg6pNzY9IE3hgCSHp1EhRlJjsntrI3Wx30m1kI");
							xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); // Enter here your Mashape key
    				}
				});
}


function newRecipeSend(){
	ga('send', 'event', 'newRecipe', 'click');
}
