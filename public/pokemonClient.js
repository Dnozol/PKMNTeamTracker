
function searchById() {
	console.log("searching for pokemon with id ");

	var id = $("#id").val();
	console.log(id);

	$.get("/onePokemon", {id: id}, function (data) {
		console.log("Back from the server with: ");
		console.log(data);

		$("#resultPokemon").append("<strong>" + data.pokemon_name + "</strong>");
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