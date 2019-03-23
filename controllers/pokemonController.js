const pokemonModel = require("../models/pokemonModel.js");

function getAllPokemon(request, response) {
	console.log("getting all pokemon");
	
	var results = pokemonModel.getAllPokemon(function(err, results) {
		response.json(results);
	});

}


function getOnePokemon(request, response) {
	var id = request.query.id;
	console.log("getting one pokemon with id: " + id);
	
	// Check if they are looking by name or number
	if (isNaN(id)) {
		//if it is a name
		pokemonModel.getPokemonByName(id, function(err, results) {
			response.json(results);
		});
	} else {
		//if it is a number
		pokemonModel.getPokemonById(id, function(err, results) {
			response.json(results);
		});
	}
}


function createNewTeam(request, response) {
	var name = request.body.name;

	console.log("creating new team with name: " + name);
	pokemonModel.insertNewTeam(name, function(err, results) {
		response.json(results);
	});


}

module.exports = {
	getAllPokemon: getAllPokemon,
	getOnePokemon: getOnePokemon,
	createNewTeam: createNewTeam
};