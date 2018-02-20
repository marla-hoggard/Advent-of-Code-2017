//n is a number or a string of digits
//Returns sum of digits who match digit halfway round circular string
function captcha_round(n) {
	var array = ("" + n).split("");
	var sum = 0;
	var len = array.length;
	for (var i = 0; i < len/2; i++) {
		if (array[i] === array[i + (len/2)]) {
			sum += +array[i];
		}
	}
	
	return sum*2;
}

