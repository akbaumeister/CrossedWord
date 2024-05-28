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

var all_riddles = loadFile("all_riddles.csv");

// Parse local CSV file
Papa.parse(all_riddles, {
	complete: function(results) {
		console.log("Finished:", results.data);
	}
});

function clickMe() {
    console.log("Clicked!");
}