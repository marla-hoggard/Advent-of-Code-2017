//Takes an array, with inputs of each tower as a string
//Returns the weight the one wrong tower should be
function weightProblem(towers) {
	//Create an array towerObjArray that contains each tower as an object 
	var towerObjArray = [];
	var numTowers = towers.length;
	for (var i = 0; i < numTowers; i++) {
		var towerArray = towers[i].trim().split(" ");
		if (towerArray.length > 2) {
			var carrying = (towerArray.slice(3)).join("");
			carrying = carrying.split(",");		
			var towerObj = new tower(towerArray[0],
														 towerArray[1],carrying);
		}
		else {
			var towerObj = new tower(towerArray[0],
														 towerArray[1],"");
			delete towerObj.carrying;
		}
		
		towerObjArray.push(towerObj);
	}
	
	//An array of just the towers that are carrying something
	var carrierObjArray = towerObjArray.filter(tower => tower.carrying);
	var numCarriers = carrierObjArray.length;
	
	for (var j = 0; j < numCarriers; j++) {
		var carrier = carrierObjArray[j];
		var carryWeights = [];
		(carrier["carrying"]).forEach(function(elem) {
			carryWeights.push(calcWeight(towerObjArray,elem));
		});
		var wrongArray = [];
		if (!allSame(carryWeights)) {
			var wrong, wrongIndex, right;
			if (carryWeights[0] != carryWeights[1]) {
				if (carryWeights[0] == carryWeights[2]) {
					wrongIndex = 1;
					wrong = carryWeights[1];
					right = carryWeights[0];
				}
				else {
					wrongIndex = 0;
					wrong = carryWeights[0];
					right = carryWeights[1];
				}
			}
			else {
				for (var w = 2; w < carryWeights.length; w++) {
					if (carryWeights[w] != carryWeights[0]) {
						wrongIndex = w;
						wrong = carryWeights[w];						
						right = carryWeights[0];
						break;
					}
				}
			}
			console.log(`${carrier["carrying"][wrongIndex]}: ${wrong}, ${carryWeights}`);
			//return getWeight(towerObjArray,carrier["carrying"][wrongIndex]) +  right - wrong;
		}
	}
	
	return "all good";	
	
}

//Object constructor for towers
function tower(name, weight, carrying) {
	this.name = name;
	this.weight = +weight.match(/\d+/)[0];
	this.carrying = carrying;
}

//Returns true if all values in array are equal, false otherwise
function allSame(array) {
	var test = array[0];
	for (var i = 0, n = array.length; i < n; i++) {
		if (array[i] != test) {	
			return false;
		}
	}
	return true;
}

//Returns the tower object from an array of tower objects (towerArray) whose name property is name
function getTower(towerArray, name) {
	var result = towerArray.filter(function(o){return o.name == name;});
	if (result[0]) {
		return result;
	}
	else return null;
	
}

//Returns the weight of the tower object in towerArray with name name
function getWeight(towerArray, name) {
	var result = towerArray.filter(function(o){return o.name == name;});
	if (result[0]) {
		return result[0].weight;
	}
	else return 0;
}

//Calculates the weight of a tower with name name
//If a tower is carrying anything, add what it's carrying to its weight
function calcWeight(towerArray,name) {
	var tower = getTower(towerArray,name)[0];
	//If tower is on top, just return its weight
	if (tower.carrying == null) {
		return getWeight(towerArray,name);
	}
	//return tower's weight plus the weight of the towers its carrying
	else {
		var weight = getWeight(towerArray,name);
		(tower.carrying).forEach(function(elem) {
			weight += calcWeight(towerArray,elem);
		});
	}
	return weight;
}

//Takes an array formatted like the problem
//Returns an array of tower objects
function toTowerArray(towers) {
	var towerObjArray = [];
	var numTowers = towers.length;
	for (var i = 0; i < numTowers; i++) {
		var towerArray = towers[i].trim().split(" ");
		if (towerArray.length > 2) {
			var carrying = (towerArray.slice(3)).join("");
			carrying = carrying.split(",");		
			var towerObj = new tower(towerArray[0],
														 towerArray[1],carrying);
		}
		else {
			var towerObj = new tower(towerArray[0],
														 towerArray[1],"");
			delete towerObj.carrying;
		}
		
		towerObjArray.push(towerObj);
	}
	return towerObjArray;
}
