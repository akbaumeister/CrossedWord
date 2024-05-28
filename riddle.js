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
Papa.parse(riddle_file, {
	complete: function(results) {
		riddle_array = results.data;
	}
});

console.log("Loaded riddles:", riddle_array);

var hint_names = [
	["yellow-hint", "🟨"],
	["blue-hint", "🟦"],
	["green-hint", "🟩"],
	["purple-hint", "🟪"],
]

var date;
var hints;
var clues;
var solution;
var second_hints;

var try_count = 5;
var try_counter_text = "";

var showModal;

function setupPage() {
	loadRiddle();
	// modal
	var modal = document.getElementById("success-modal");
	var btn = document.getElementById("myBtn");
	var span = document.getElementsByClassName("close")[0];

	showModal = function() {
		modal.style.display = "block";
	}

	// close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}

function loadRiddle() {

	var n = Math.floor(Math.random() * (riddle_array.length / 4))

	date = riddle_array[n*4][0];
	hints = riddle_array[n*4+1];
	clues = riddle_array[n*4+2].slice(0, 4);
	solution = riddle_array[n*4+2][4];
	second_hints = riddle_array[n*4+3];

	console.log(
		"Current riddle",
		date,
		hints,
		clues,
		solution,
		second_hints
	)

	document.getElementById("yellow-hint").innerHTML = hints[0];
	document.getElementById("blue-hint").innerHTML = hints[1];
	document.getElementById("green-hint").innerHTML = hints[2];
	document.getElementById("purple-hint").innerHTML = hints[3];
	document.getElementById("center-hint").innerHTML = hints[4];

	document.getElementById("yellow-clue").innerHTML = clues[0];
	document.getElementById("blue-clue").innerHTML = clues[1];
	document.getElementById("green-clue").innerHTML = clues[2];
	document.getElementById("purple-clue").innerHTML = clues[3];
}

function checkSolution() {
	console.log("Checking solution!");
	var inp_solution = document.getElementById("inp-solution");

	if(inp_solution.value.toLowerCase() 
		=== solution.toLowerCase()) {
		document.getElementById("prompt").innerHTML = "Solution found!";
		inp_solution.disabled = true;
		
		spendTry("✔️");
		showModal();
	} else {
		spendTry("❌");
	}
}

function revealHint(i) {
	if (try_count <= 1) {
		return;
	}

	document.getElementById(hint_names[i][0]).innerHTML += "<br><i>" + second_hints[i] + "</i>";
	document.getElementById(hint_names[i][0]).disabled = true;
	spendTry(hint_names[i][1]);
}

function spendTry(chr) {
	if (try_count <= 0) {
		return;
	}

	if (try_count > 0) {
		try_count -= 1;
	}
	if (try_count <= 1) {
		for (let i = 0; i < 4; i++) {
			document.getElementById(hint_names[i][0]).disabled = true;
		}
	}
	if (try_count <= 0) {
		document.getElementById("inp-solution").disabled = true;
	}

	try_counter_text += chr;
	document.getElementById("try-counter").innerHTML = try_counter_text + "🔵".repeat(try_count);
}