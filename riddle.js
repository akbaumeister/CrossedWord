function loadFile(filePath) {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send();
	if (xmlhttp.status==200) {
		result = xmlhttp.responseText;
	}
	return result;
}

var riddle_file = loadFile("all_riddles.csv");
var riddle_array;

// Parse local CSV file
Papa.parse(all_riddles, {
	complete: function(results) {
		riddle_array = results.data;
	}
});

console.log("Loaded riddles:", riddle_array);

function clickMe() {
    console.log("Clicked!");
}