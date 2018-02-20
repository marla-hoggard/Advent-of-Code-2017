//n is a number or a string of digits
//Returns sum of digits who are followed by a matching digit, circular
function captcha(n) {
	var array = ("" + n).split("");
	var sum = 0;
	for (var i = 0, n = array.length; i < n-1; i++) {
		if (array[i] === array[i+1]) {
			sum += +array[i];
		}
	}
	if (array[array.length-1] === array[0]) {
		sum += +array[0];
	}
	return sum;
}
