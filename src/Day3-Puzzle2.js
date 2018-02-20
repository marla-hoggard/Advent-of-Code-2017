//Returns the nth number in the spiral
//as described in the puzzle
function spiralSum(n) {
	if (n < 1) {
		console.log(`${n} is not a positive integer.`);
		return;
	}
	//The first nine numbers (plus 0 for 0)
	var init = [0,1,1,2,4,5,10,11,23,25];
	if (n < 10) {
		return init[n];
	}
	
	var ring = 3;
	var i = 5;
	//Figure out what ring n is in
	while(n > i*i) {
		ring++;	
		i+=2;
	}
	var size = i-1;
	var diff1 = 8*(ring-2);
	var side = 4 - Math.floor(((i*i) - n ) / size);
	
	if (n == i*i) { //Fourth corner
		//console.log(`${n} is the fourth corner.`);
		//console.log(`Checking ${n-1}, ${(i-2)*(i-2)}, ${(i-2)*(i-2)+1}`);
		return (spiralSum(n-1) 
							+ spiralSum((i-2)*(i-2)) 
							+ spiralSum((i-2)*(i-2)+1));
	}
	if (n == (i*i) - size) { //Third corner
		//console.log(`${n} is the third corner.`);
		//console.log(`Checking ${n-1}, ${n-diff1-6}`);
		return spiralSum(n-1) + spiralSum(n-diff1-6);
	}
	if (n == (i*i) - (size*2)) { //Second corner
		//console.log(`${n} is the second corner.`);
		//console.log(`Checking ${n-1}, ${n-diff1-4}`);
		return spiralSum(n-1) + spiralSum(n-diff1-4);
	}
	if (n == (i*i) - (size*3)) { // First corner
		//console.log(`${n} is the first corner.`);
		//console.log(`Checking ${n-1}, ${n-(diff1+2)}`);
		return (spiralSum(n-1) 
							+ spiralSum(n-(diff1+2)));
	}
		
	//Other special cases
	if (n == ((i-2)*(i-2) + 1)) { //First elem in ring
		//console.log(`${n} is the first elem in ring.`);
		//console.log(`Checking ${n-1}, ${n-diff1}`);
			return spiralSum(n-1) + spiralSum(n-diff1);
	}
	if (n == ((i-2)*(i-2) + 2)) { //Second elem in ring
		//console.log(`${n} is the second elem in ring.`);
		//console.log(`Checking ${n-1}, ${n-diff1}, ${n-(diff1+1)}`);
			return spiralSum(n-1) + spiralSum(n-2)
				+ spiralSum(n-(diff1)) 
				+ spiralSum(n-(diff1+1));
	}
	if (n == ((i*i) - (size*3) - 1)) { //1st corner -1
		//console.log(`${n} is the first corner less one.`);
		//console.log(`Checking ${n-1}, ${n-(diff1+2)}, ${n-(diff1+1)}`);
		return (spiralSum(n-1) 
							+ spiralSum(n-(diff1+2)) 
							+ spiralSum(n-(diff1+1)));
	}
	
		if (n == ((i*i) - (size*3) + 1)) { //1st corner +1
		//console.log(`${n} is the first corner plus one.`);
		//console.log(`Checking ${n-1}, ${n-2}, ${n-(diff1+2)}, ${n-(diff1+3)}`);
		return (spiralSum(n-1) + spiralSum(n-2) 
							+ spiralSum(n-(diff1+2)) 
							+ spiralSum(n-(diff1+3)));
	}
	
	if (n == ((i*i) - (size*2) - 1)) { //2nd corner -1
		//console.log(`${n} is the second corner less one.`);	
		//console.log(`Checking ${n-1}, ${n-diff1-3}, ${n-diff1-4}`);
		return (spiralSum(n-1) 
							+ spiralSum(n-diff1-3) 
							+ spiralSum(n-diff1-4));
	}
	
	if (n == ((i*i) - (size*2) + 1)) { //2nd corner +1
		//console.log(`${n} is the first corner plus one.`);
		//console.log(`Checking ${n-1}, ${n-2}, ${n-(diff1+4)}, ${n-(diff1+5)}`);
		return (spiralSum(n-1) + spiralSum(n-2) 
							+ spiralSum(n-(diff1+4)) 
							+ spiralSum(n-(diff1+5)));
	}
	
	if (n == ((i*i) - size - 1)) { //3rd corner -1
		//console.log(`${n} is the third corner less one.`);		
		//console.log(`Checking ${n-1}, ${n-2}, ${n-(diff1+5)}, ${n-(diff1+6)}`);
		return (spiralSum(n-1) 
							+ spiralSum(n-diff1-5) 
							+ spiralSum(n-diff1-6));
	}
	
	if (n == ((i*i) - size + 1)) { //3rd corner +1
		//console.log(`${n} is the first corner plus one.`);
		//console.log(`Checking ${n-1}, ${n-2}, ${n-(diff1+6)}, ${n-(diff1+7)}`);
		return (spiralSum(n-1) + spiralSum(n-2) 
							+ spiralSum(n-(diff1+6)) 
							+ spiralSum(n-(diff1+7)));
	}
	
	//Rest of the elements
	if (side == 1) {
		//console.log(`${n} is on side 1.`);
		//console.log(`Checking ${n-1}, ${n-diff1}, ${n-(diff1+1)}, ${n-(diff1+2)}`);
		return (spiralSum(n-1) + spiralSum(n-diff1)
						+ spiralSum(n-(diff1+1)) + spiralSum(n-(diff1+2)));
	}
	if (side == 2) {
		//console.log(`${n} is on side 2.`);
		//console.log(`Checking ${n-1}, ${n-diff1-2}, ${n-(diff1+3)}, ${n-(diff1+4)}`);
		return (spiralSum(n-1) + spiralSum(n-diff1-2)
						+ spiralSum(n-diff1-3) + spiralSum(n-diff1-4));
	}
	if (side == 3) {
		//console.log(`${n} is on side 3.`);
		//console.log(`Checking ${n-1}, ${n-diff1-4}, ${n-(diff1+5)}, ${n-(diff1+6)}`);
		return (spiralSum(n-1) + spiralSum(n-diff1-4)
						+ spiralSum(n-diff1-5) + spiralSum(n-diff1-6));
	}
	else { //side 4
		//console.log(`${n} is on side 4.`);	
		//console.log(`Checking ${n-1}, ${n-diff1-6}, ${n-(diff1+7)}, ${n-(diff1+8)}`);
		return (spiralSum(n-1) + spiralSum(n-diff1-6)
						+ spiralSum(n-diff1-7) + spiralSum(n-diff1-8));
	}	
	
}

//Advent of Code - Day 3 - Puzzle 2
//Returns the first value of spiralSum larger than n
function spiralRun(n) {
	var i = 1;
	while (spiralSum(i) <= n) {
		i++;
	}
	console.log(i);
	return spiralSum(i);
}
