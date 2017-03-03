$(document).ready(function() {
	initializePage();
})

function initializePage() {
  $('#continue').click(continuemk);

}

function continuemk() {
	var checked = document.getElementsByTagName("input");
	console.log("bfhjdbjkf");
	var gluten, dairy;
	var data = {};
	for (var i = 0; i < checked.length; i++) {
			// console.log("The checked item is: " + checked[i].id);
			if (checked[i].checked) {
				console.log("checked is: " + checked[i].id)
				if (checked[i].id == 'dairy') {
					data['dairy'] = 'true';
				}
				if (checked[i].id == 'gluten') {
					data['gluten'] = 'true';
				}
			}
			else {
				console.log("not checked");
			}
		}
		$.ajax({
			type: "POST",
			data: JSON.stringify(data),
			url: "/updateUser",
			contentType: "application/json",
		}).done(function() {
  		$.get('/grocery');
		});
}
