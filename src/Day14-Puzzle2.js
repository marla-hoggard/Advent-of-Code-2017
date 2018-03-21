//Answer is between 1061 and 1562

//Advent of Code - Day 14 - Puzzle 2
//Convert input-0 ... input-127 via asciiHash(Day10)
//Convert each hex output binary (4-digits to 1 hex)
//Returns the number of groups in the output grid
//A group is a contiguous mass of 1s, adj not diag
function createBinaryGrid(input) {
	//hexGrid is 128 hexidecimal knot hashes
	var hexGrid = [];
	for (var x = 0; x < 128; x++) {
		var row = input + "-" + x;
		hexGrid.push(asciiHash(row));
		//console.log(`Created row ${x}`);
	}
	//Convert each hex to binary string (4-chars per letter)
	//Create a 128x128 2D array binaryGrid of 0s and 1s
	var binaryGrid = [];
	var binaryGrid2 = [];
	for (var i = 0; i < 128; i++) {
		var binary = "";
		for (var j = 0; j < 32; j++) {
			var hexChar = parseInt(hexGrid[i].charAt(j),16).toString(2);
			binary += hexChar.padStart(4,"0");
		}
		binaryGrid.push(binary.split(""));
	}
	return binaryGrid;
	
}

//Takes a 2D array of 1s and 0s 
//Returns number of contiguous groups of 1s
function groupCount(input) {
	let binaryGrid = createBinaryGrid(input);
	let width = binaryGrid[0].length;
	let height = binaryGrid.length;
	/*binaryGrid = [
		[0,1,1,0,0,1,1,0],
		[1,0,1,1,0,1,0,0],
		[1,1,0,1,0,1,0,1],
		[0,1,0,1,1,1,0,1],
		[1,0,0,0,0,0,0,0],
		[0,1,0,0,0,1,1,1],
		[1,1,0,1,1,0,0,1],
		[1,0,1,0,1,0,1,1]];*/
	
	var groups = 0;
	for (var row = 0; row < height; row++) {
		for (var col = 0; col < width; col++) {
			if (binaryGrid[row][col] > 0) {
				if (binaryGrid[row][col] == 1) {
					//Check if cell to right is already in a counted group
					if (col != width - 1 && binaryGrid[row][col + 1] > 1) { 
						//change cell to adjacent group#
						binaryGrid[row][col] = binaryGrid[row][col + 1];
					}
					else { //Start a new group
						groups++;
						binaryGrid[row][col] = groups + 1;
					}
				}
				//Check if you're in the middle of a duplicate group
				else if (col != width - 1 && binaryGrid[row][col + 1] > 1 
							&& binaryGrid[row][col] != binaryGrid[row][col + 1]) {
					//console.log(`duplicate at [${row}][${col}]`);
					binaryGrid[row][col + 1] = binaryGrid[row][col];
					groups--;
				}

				//Change adjacent 1s to group#
				if (col != width - 1 && binaryGrid[row][col + 1] == 1) {
					binaryGrid[row][col + 1] = binaryGrid[row][col];
				}
				if (row != width - 1 && binaryGrid[row + 1][col] == 1) {
					binaryGrid[row + 1][col] = binaryGrid[row][col];
				}
			}
			
		}
	}

	console.log(groups);
	return binaryGrid;
	/*
	console.log(binaryGrid);
	return groups;
	*/
}

//RETURNS THE HTML FOR A VISUAL REPRESENTATION OF THE GROUPED GRID
function visualGrid(input) {
	let visualGrid = groupCount(input);
	let HTML = "";
	visualGrid.forEach(row => {
		let rowHTML = '<div class="row">';
			row.forEach(elem => {
				let hex = (elem*10000).toString(16).padStart(6,"0");
				let color = elem == 0 ? '#FFFFFF' : '#' + hex;
				rowHTML += `<div class="box" style="background-color: ${color};"></div>`;
			});
		rowHTML += '</div>';
		HTML += rowHTML;
	})
	return HTML;
}

//WHOLE NEW APPROACH
function pipeMethod(input) {
	let binaryGrid = createBinaryGrid(input);
	let width = binaryGrid[0].length;
	let height = binaryGrid.length;

	//Make ones an object in the form <location of 1>: [array of loc of adjacent 1s]
	//grid is numbered L-R then T-B from 0 to width*height
	//example: 128 per row, the second item in the second row is a 1, so is the item above it and to the right:
	//129: [1,130]
	let ones = {}, solos = [];
	binaryGrid.forEach((row,whichRow,grid) => {
		row.forEach((elem,index) => {
			if (elem == 1) {
				let spot = whichRow * width + index;
				let touches = [];
				//to the left
				if (index > 0 && row[index - 1] == 1) {
					touches.push(whichRow * width + index - 1);
				}
				//to the right
				if (index < width - 1 && row[index + 1] == 1) {
					touches.push(whichRow * width + index + 1);
				}
				//above
				if (whichRow > 0 && grid[whichRow - 1][index] == 1) {
					touches.push((whichRow - 1) * width + index);
				}
				//below
				if (whichRow < height - 1 && grid[whichRow + 1][index] == 1) {
					touches.push((whichRow + 1) * width + index);
				}

				if (touches.length > 0) {
					ones[spot] = touches;
				}
				else solos.push(spot);
			}
		})
	})
	//console.log(solos);
	return solos.length + defragGroups(ones);

} 
//Returns the number of connected groups in obj
//obj is in form item#: [#,#,#] (item's connections)
function defragGroups(obj) {
	var groups = 0;
	var props = Object.keys(obj).map(elem => +elem);

	//Run talkNumGroup on first elem in props
	//Remove all elements in props[0]'s group; groups++
	//Keep running until no elements remain in prop
	while (props.length > 0) {
		var found =	talkNumGroup(obj,props[0]);
		//console.log(found);
		props = props.filter(elem => !(found).includes(elem));
		groups++;
	}
	return groups;
}

