
function searchById() {
	document.getElementById("resultPokemon").innerHTML = "";
	var id = $("#id").val();

	$.get("/onePokemon", {id: id}, function (data) {

		$("#resultPokemon").append("<strong>" + data.pokemon[0].pokemon_name + "</strong>" +
			"    Type 1: " + data.pokemon[0].type_1 + "    Type 2: " + data.pokemon[0].type_2);
	});
}

function searchByName() {
	document.getElementById("resultPokemon").innerHTML = "";
	var name = $("#name").val();
	$.get("/onePokemon", {name: name}, function (data) {
		$("#resultPokemon").append("<strong>" + data.pokemon[0].pokemon_name + "</strong>" +
			"\tType 1: " + data.pokemon[0].type_1 + "\tType 2: " + data.pokemon[0].type_2);
	});


}

function addPokemon() {
	console.log("adding pokemon (client)");
	var name = $("#pokemon_name").val();
	var type1 = $("#type1").val();
	var type2 = $("#type2").val();
	$.post("/newPokemon", {name:name, type1:type1, type2:type2}, function(data) {
		console.log("Got data from client");
		console.log(data);
	});
}

function getAllPokemon() {

	var id = $("#id").val();

	$.get("/allPokemon", {id: id}, function (data) {

		for (var i = 0; i < data.pokemon.length; i++) {
			var pokemonlist = data.pokemon[i];

			$("#resultPokemon").append("<p>" + pokemonlist.pokemon_name + "</p>");
		}
	});
}

function populateTypes() {
	var types = ["Dark", "Psychic", "Fighting", "Ice", "Ground", "Electric", "Normal", "Water", "Rock", "Fairy", "Fire",
				 "Poison", "Bug", "Ghost", "Dragon", "Grass", "Flying", "Steel"];
	var list = "";
	for (var i = 0; i < types.length; i++) {
		list = list + "<option value" + types[i] + ">" + types[i] + "</option>";
	}
	document.getElementById("type1").innerHTML = list;
	list = "<option value" + null + ">None" + "</option>" + list; 
	document.getElementById("type2").innerHTML = list;
}

function login() {
	console.log("in login()");
	var trainer_name = $("#trainer_name").val();
	var password = $("#password").val();

	var params = { 
		trainer_name: trainer_name,
	    password: password
	};

	$.post("/login", params, function(results) {
		if(results && results.success) {
			console.log("Successfully logged in.");
		} else {
			$("#status").text("Error logging in");
		}
	});
}

function logout() {
	$.post("/logout", function(results) {
		if(results && results.success) {
			$("#status").text("Successfully logged out.");
		} else {
			$("#status").text("Error logging out");
		}
	});
}

function addTeam() {
	console.log("in addTeam client");
	var team_name = $("#team_name").val();
	var pokemon1 = $("#pokemon1").val();

	var params = {
		team_name: team_name,
		password: password
	};

	$.post("/addTeam", params, function(results) {
		if(results && results.success) {
			console.log("back from /addteam Successfully");
		} else {
			console.log("back from /addTeam and failed");
		}
	});
}

function createNewAccount() {
	var trainer_name = $("#trainer_name").val();
	var password = $("#password").val();
	var params = {
		trainer_name: trainer_name,
		password: password
	};

	$.post("/register", params, function(results) {
		if(results && results.success) {
			$("#status").text("added new user.");
		} else {
			$("#status").text("failed to add new user.");
		}
	});
}

function displayUserInfo() {
	$.get("/userInfo", function(results) {
		var welcome = "Welcome to your Team Browser " + results;
		document.getElementById("userInfo").innerHTML = welcome;
	});
}

function loadTeamInfo() {
	$.get("/teamInfo", function(results) {
		var addToTeam = "Adding to team: " + results;
		document.getElementById("teamInfo").innerHTML = addToTeam;
	});
}

function addToTeam() {
	var pokemon = $("#pokemon");
	$.post("/addPokemonToTeam", pokemon, function(results) {
		if(results && results.success) {
			var pokemon = results.pokemon;
			document.getElementById("results").innerHTML = pokemon + " successfully added to team " + results.team;
		} else {
			document.getElementById("results").innerHTML = "Failed to add to team " + results.message;
		}
	});
}

function displayAllTeams() {
	console.log("in displayAllTeam client");
	var teams = "";

	$.get("/getAllTeams", function(results) {
		for(var i = 0; i < results.length; i++) {
			console.log(results[i].team_name + " " + results[i].pokemon_name);
			teams = teams + results[i].team_name + " " + results[i].pokemon_name + "</p>";
		}
		document.getElementById("resultPokemon").innerHTML = teams;
	});
}