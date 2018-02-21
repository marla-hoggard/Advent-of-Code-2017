//Takes array of instructions (integers)
//Returns number of steps to get out of maze
function escapeMaze2(instr) {
	var i = 0;
	var n = instr.length;
	var steps = 0;
	while (i < n) {
		if (instr[i] >= 3) {
			instr[i]--;
			i += instr[i] + 1;
			steps++;
		}
		else {
			instr[i]++;
			i += instr[i] - 1;
			steps++;
		}
	}
	return steps;
}
