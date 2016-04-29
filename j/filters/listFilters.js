angular.module('naukri.listing',[])
	.filter('selectedChildrenId', function() {
		 return function(input) {
//			 console.log(arguments,input);
			 return input;
  		 }
});