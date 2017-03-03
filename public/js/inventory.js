

var item;

$(document).ready(function() {
	initializePage();
})


function initializePage() {
	console.log("Javascript connected!");
	$('.dec').click(decrement)
	$('.inc').click(increment)
}

function decrement(){
    console.log("decremented");

    item = this.id;
    //var url = "/decrement/" + item;

    $.ajax({
		url: "/decrement" + item,
    	type: "GET",
    })

    success: function (result){
    	console.log("result is " + result);
    	result 
    }
    
    $.get('/decrement', decCallBack);

}

function increment(){
    console.log("incremented");
    item = this.id;
    //var url = "/increment/" + item
    $.get('/increment', incCallBack);

}

function decCallBack(result){
	console.log(result);

	console.log("item: " + item);



	$('#').html(name);
}

function incCallBack(result){
	console.log(result);
	console.log("item: " + item);


}

