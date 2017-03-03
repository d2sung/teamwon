'use strict';

var groceryList_local = [];
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$("#success-alert").hide();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

  $.get("/grocerylist", getGroceryList);

  // ADD click listener here
  // DELETE click listener here

}

function showAlert() {
	$("#success-alert").alert();
	$("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
		$("#success-alert").slideUp(500);
		});
	}

function getGroceryList(result) {
  console.log(result);
	console.log(groceryList_local);
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
				console.log("Local grocery list");
				console.log(groceryList_local);
				var url = "/grocery/" + groceryList_local[i].name;
				console.log(url);
				$.get(url, initializePage);
				groceryList_local.splice(i, 1);
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
