//Takes an array of arrays
//For each array, calculate the difference between min and max
//Return the sum of those differences
function checksum(matrix) {
	var array = [];
	var sum = 0;
	for (var i = 0, n = matrix.length; i < n; i++) {
		array = matrix[i];
		array.sort(function(a,b) {return a-b;});
		sum += (array[array.length - 1] - array[0]);
	}
	return sum;	
}
