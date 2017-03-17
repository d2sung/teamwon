var sumCalories = 0;
var _name, _gluten, _dairy, _peanut, _egg, _sesame, _seafood, _shellfish, _soy, _sulfite, _tree_nut, _diet, _dislikes;
var _query, _cuisine, _calories, _ingredients;
var numIterated;
var numPoints;

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$("#imDone").click(goHome);
  details();
}

function details() {
	var id = getId();

	var htmlToInject = '<h5>You\'ve earned a total of '+ id + ' points for this recipe!</h5>'
	$('#main-div').append(htmlToInject);
	$('#imDone').css("display", "block");
}

function getId() {
	var url = window.location.href.split('/');
	return url[4];
}

function goHome() {
	window.location.href = "/grocery";
}
