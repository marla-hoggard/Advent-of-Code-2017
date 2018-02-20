//Takes an integer, returns distance to 1 when
//numbers are written in a counter-clockwise spiral
function spiralDist(n) {
	if (n < 1) {
		return "invalid input.";
	}
	if (n === 1) {
		return 0;
	}
	var ring = 2;
	var i = 3;
	
	//Figure out what ring n is in
	while(n > i*i) {
		ring++;	
		i+=2;
	}
	
	var diff = (i*i) - n; //distance from i*i in the ring
	var size = i-1;
	return ((ring-1) + Math.abs((size/2) - (diff % size)));
}
