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
    var htmlToInject = '<div id="' + index + '"> ' +
    '<p name="item" value="">'  + value.name + ' - Quantity: ' + value.quantity
    + '</p></div>';
    $('#ingredientsList').append(htmlToInject);
  });
	//$('.checkbox').click(showMoveButton);
}
