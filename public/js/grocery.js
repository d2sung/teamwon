'use strict';

var groceryList_local = [];
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

  $.get("/grocerylist", getGroceryList);

  // ADD click listener here
  // DELETE click listener here

}

function getGroceryList(result) {
  console.log(result);
  $.each( result['groceries'], function (index, value) {
		if(value) {
	    var htmlToInject = '<div class="checkbox" id="' + value.name + '"> <label>' +
	    '<input type="checkbox" name="check" value="">' + 'Name: ' + value.name + ' Quantity: ' + value.quantity
	    + '</label></div>';
			groceryList_local.push({name: value.name, quantity: value.quantity, units: value.units, toDelete: false});
			console.log(groceryList_local);
	    $('#groceryList').append(htmlToInject);
		}
  });
	$('.checkbox').click(showMoveButton);
}

function moveGroceryItems() {

	var checked = document.getElementsByName('check');
		for (var i = 0; i < checked.length; i++) {
			if (checked[i].checked) {
				$('#'+groceryList_local[i].name).remove();
				var url = "/grocery/" + groceryList_local[i].name;
				console.log(url);
				$.get(url, initializePage);
				}
			else {
				groceryList_local[i].toDelete = false;
				console.log ("not checked");
			}
		}
}

function moveCallback() {


}

function showMoveButton(e) {

  // TODO: This next part not working properly (to hide button if nothing selected)
	/*
	var checkboxes = document.getElementsByClassName('checkbox');
	var show = false;
	for (var i = 0; i < checkboxes.length; i++) {
		console.log(checkboxes);
		if (checkboxes[i].checked) {
			show = true;
		}
	}
	if (show) {
		document.getElementById("moveToInventory").style.display="block";
	}
	else {
		document.getElementById("moveToInventory").style.display="block";
	} */
	document.getElementById("moveToInventory").style.display="block";

}
