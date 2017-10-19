var getTypeOfNumber = function(number) {
    return new Promise(
        function(resolve, reject) {                
            setTimeout(function() {
		        var type = (number % 2) ? "odd" : "even";
		        var text = "The number "+ number +" is " + type
		        return resolve(text);
		    }, 100);
        }
    );
}

var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (var i = 0; i < list.length; i++) {
    var number = list[i];
    getTypeOfNumber(number)
    	.then(function(text){
    		console.log(text)
    	});
}