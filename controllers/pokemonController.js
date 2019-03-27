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

function addNewPokemon(request, response) {
	var name = request.body.name;
	var type1 = request.body.type1;
	var type2 = request.body.type2;
	console.log("creating new pokemon (controller)");
	pokemonModel.insertNewPokemon(name, type1, type2, function(err, results) {
		response.json(results);
	});
}


function handleLogin(request, response) {
	var trainer_name = request.body.trainer_name;
	var password = request.body.password;

	pokemonModel.checkLoginUser(trainer_name, password, function(err, results) {
		response.json(results);
	});
}

function handleLogout(request, response) {
	var result = {success: false};
	if(request.session.trainer) {
		request.session.destroy();
		result = {success: true};
	}
	response.json(result);
}

module.exports = {
	getAllPokemon: getAllPokemon,
	getOnePokemon: getOnePokemon,
	createNewTeam: createNewTeam,
	addNewPokemon: addNewPokemon
};