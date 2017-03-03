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
	groceryList_local = [];
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


	var data = {};
	var checked = document.getElementsByName('check');

	console.log("checked.length = " +checked.length);
	var length = checked.length;
	var count = 0;
		for (var i = 0; (i+count) < length  ; i++) {
			console.log("i + count = " + (i+count));
			// if( (i+count) >= length) {
			// 	break;
			// }
			console.log("Checking against " + groceryList_local[i+count].name);
			if (checked[i].checked) {
					data[count]= groceryList_local[i+count].name;
					$('#'+groceryList_local[i+count].name).remove();
					console.log("pushing " + groceryList_local[i+count].name + " to data");
					console.log("current data: " + JSON.stringify(data));


					count++;
					i--;

					console.log("count = " + count);
					console.log("length = " + length);
					console.log("count+i = " + (count+i)) ;
					console.log("length = " + length);
			}
			else {
				console.log ("not checked");
			}
		}

		console.log("current data: " + JSON.stringify(data));
		//$.post('/move', data);
		$.ajax({
			 type: "POST",
			 data: JSON.stringify(data),
			 url: "/move",
			 contentType: "application/json"
	 });

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
