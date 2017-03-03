

var item;

$(document).ready(function() {
	initializePage();
})


function initializePage() {
	$(".list-group-item").remove();
	$.get("/inventoryList", getInventoryList)
		
}

function getInventoryList(result) {
	console.log(result);
	
	$.each(result['ingredients'], function(index, value){
		if (value) {
			var htmlToInject = '<li class="list-group-item">' +
					 	value.name + '<div class = "pull-right"> <a class = "dec" id ='
						+ value.name + '> <i class="glyphicon glyphicon-minus-sign "> </i> </a>' +
						value.quantity + value.units 
						+ '<a class = "inc" id =' + value.name + '> <i class="glyphicon glyphicon-plus-sign"></i> </a> </div> </li>'
		
		$('#inventoryList').append(htmlToInject);
		}
	});

	$('.inc').click(increment)
	$('.dec').click(decrement)
	
}

function decrement(){
    console.log("decremented");
	item = this.id;
	var url = "/decrement/" + item;
    $.get(url, initializePage);

}

function increment(){
    console.log("incremented");
    item = this.id;
   	var url = "/increment/" + item;
    $.get(url, initializePage);

}

/*function decCallBack(result){
	console.log("decCallback");
	console.log(result);
	$.get('/inventory');
}

function incCallBack(result){
	console.log("incCallback");
	console.log(result);
	$.get('/inventory');
}*/

