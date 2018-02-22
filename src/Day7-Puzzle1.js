//Takes an array, with inputs of each tower as a string
//Returns the name of the bottom tower
function bottomTower(towers) {
	//Filter to only towers that carry something
	var carriers = towers.filter(function(elem) {
		return elem.includes('->');
	});
	//trim whitespace from each tower
	carriers.forEach(function(elem, index) {
		carriers[index] = elem.trim();
	});
	
	//Create an array carrierObjs that contains each carrier as an object with prop name, weight and carrying
	var carrierObjs = [];
	for (var i = 0, n = carriers.length; i < n; i++) {
		var carrierArray = carriers[i].split(" ");
		var carrying = (carrierArray.slice(3)).join("");
		carrying = carrying.split(",");
		
		var towerObj = new tower(carrierArray[0],
														 carrierArray[1],carrying);
		carrierObjs.push(towerObj);
	}
	console.log(carrierObjs);
	//Make carried an array of the towers that are carried 
	var carried = [];
	for (var t = 0; t < carrierObjs.length; t++) {
		for (var carrier = 0; carrier < carrierObjs[t].carrying.length; carrier++) {
			if (!carried.includes(carrierObjs[t].carrying[carrier])) {
				carried.push(carrierObjs[t].carrying[carrier]);
			}
		}
	}
	
	//Find the tower that no one is carrying
	for (var c = 0; c < carrierObjs.length; c++) {
		if (!carried.includes(carrierObjs[c].name)) {
			return carrierObjs[c].name;
		}
	}
	return null;
}

//Object constructor for towers
function tower(name, weight, carrying) {
	this.name = name;
	this.weight = +weight.match(/\d+/)[0];
	this.carrying = carrying;
}
