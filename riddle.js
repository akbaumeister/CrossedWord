// Parse local CSV file
Papa.parse(File.open("all_riddles.csv"), {
	complete: function(results) {
		console.log("Finished:", results.data);
	}
});

function clickMe() {
    console.log("Clicked!");
}