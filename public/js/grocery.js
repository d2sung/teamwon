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
    var htmlToInject = '<div class="checkbox" id="' + index + '"> <label>' +
    '<input type="checkbox" name="check" value="">' + 'Name: ' + value.name + ' Quantity: ' + value.quantity
    + '</label></div>';
		groceryList_local.push({name: value.name, quantity: value.quantity, units: value.units, toDelete: false});
		console.log(groceryList_local);
    $('#groceryList').append(htmlToInject);
  });
	$('.checkbox').click(showMoveButton);
}

function moveGroceryItems() {

	var checked = document.getElementsByName('check');
	$.get("/inventoryList", function (data) {
		console.log("successfully got json data");
		console.log(data);
		for (var i = 0; i < checked.length; i++) {
			if (checked[i].checked) {
				data.inventory.push({
					name: groceryList_local[i].name,
					quantity: groceryList_local[i].quantity,
					units: groceryList_local[i].units
				});
				groceryList_local[i].toDelete = true;
			}
			else {
				groceryList_local[i].toDelete = false;
				console.log ("not checked");
			}
		}
		$.get("/groceryList", function (result) {
			var offset = 0;
			console.log(result);
			var length = groceryList_local.length;
			console.log("length is: " +  length);
			for (var j = 0; j < length; j++) {
				if(groceryList_local[j].toDelete) {
					delete result.groceries[j];
					$("div[id*=" + j + "]").remove();
					offset++;
				}

			}
		});

		console.log(data);
	});
  console.log("Hehe");
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
