$(document).ready(function() {
	initializePage();
})

function initializePage() {

  $.get("/ingredientslist", getIngredientsList);

  // ADD click listener here
  // DELETE click listener here
}

function getIngredientsList(result) {
  console.log(result);
  $.each( result['ingredients'], function (index, value) {
    var htmlToInject = '<li class="list-group-item"> <span class="badge">' + value.quantity + '</span> <div id="' + index + '"> <p name="item" value="">'  + value.name + '</p></div> </li>' 

    $('#ingredientsList').append(htmlToInject);
  });
	//$('.checkbox').click(showMoveButton);
}
