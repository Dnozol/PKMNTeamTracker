
function searchById() {
	console.log("searching for pokemon with id ");
	document.getElementById("resultPokemon").innerHTML = "";
	var id = $("#id").val();
	console.log(id);

	$.get("/onePokemon", {id: id}, function (data) {
		console.log("Back from the server with: ");
		console.log(data);

		$("#resultPokemon").append("<strong>" + data.pokemon[0].pokemon_name + "</strong>" +
			"    Type 1: " + data.pokemon[0].type_1 + "    Type 2: " + data.pokemon[0].type_2);
	});
}

function searchByName() {
	console.log("searching for pokemon with name");
	document.getElementById("resultPokemon").innerHTML = "";
	var name = $("#name").val();
	console.log(name);
	$.get("/onePokemon", {name: name}, function (data) {
		console.log("Back from the server with: ");
		console.log(data);

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
	console.log("searching for pokemon with id ");

	var id = $("#id").val();
	console.log(id);

	$.get("/allPokemon", {id: id}, function (data) {
		console.log("Back from the server with: ");
		console.log(data);

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

function login () {
	var username = $("#username").val();
	var password = $("#password").val();

	var params = { 
		username: username,
	    password: password
	};

	$.post("/login", params, function(result) {
		if(result && result.success) {
			$("#status").text("Successfully logged in.");
		} else {
			$("#status").text("Error logging in");
		}
	});
}

function logout() {
	app.post("/logout", params, function(result) {
		if(result && result.success) {
			$("#status").text("Successfully logged out.");
		} else {
			$("#status").text("Error logging out");
		}
	});
}