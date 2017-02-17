'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

  $.get("/grocerylist", getGroceryList);

  $('.checkbox').click(moveGroceryItem);
  // ADD click listener here
  // DELETE click listener here

}

function getGroceryList(result) {
  console.log(result);
  $.each( result['groceries'], function (index, value) {
    console.log ("Ran");
    var htmlToInject = '<div class="checkbox" id="' + index + '"> <label>' +
    '<input type="checkbox" value="">' + 'Name: ' + value.name + ' Quantity: ' + value.quantity
    + '</label></div>';
    $('#groceryList').append(htmlToInject);
  });
}

function moveGroceryItem(e) {
  e.preventDefault();

  console.log()
}
