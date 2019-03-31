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
	pokemonModel.insertNewPokemon(name, type1, type2, function(error, results) {
		response.json(results);
	});
}

function addTeam(request,response) {
	console.log("in addTeam");

	var trainer_name = request.session.trainer_name;
	var team_name = request.body.team_name;

	pokemonModel.addTeamToDb(trainer_name, team_name, function(error, results) {
		if(error) {
			throw error;
		}
		else {
			if(results && results.success) {
				request.session.team_name = team_name;
				console.log("Back from db");
				response.redirect("addPokemonToTeam.html");
			}
		}
	});
}

function handleLogin(request, response) {
	
	var trainer_name = request.body.trainer_name;
	var password = request.body.password;

	pokemonModel.checkSignIn(trainer_name, password, function(error, results) {
		if(results && results.success) {
			request.session.trainer_name = trainer_name;
			response.redirect("pokemon.html");
		}
	});
}

function handleLogout(request, response) {
	var results = {success: false};
	if(request.session.trainer_name) {
		console.log("signing out");
		request.session.destroy();
		results = {success: true};
	}
	response.redirect("signin.html");
}

function handleRegister(request, response) {
	const trainer_name = request.body.trainer_name;
	const password = request.body.password;

	pokemonModel.createTrainer(trainer_name, password, function(error, results) {
		response.json(results);
	});
}

function getUserInfo(request, response) {
	console.log("in getUserInfo controller");

	var trainer_name = request.session.trainer_name;
	response.send(trainer_name);
}

function getTeamInfo(request, response) {
	console.log("getTeamInfo controller");
	var team_name = request.session.team_name;
	response.send(team_name);
}

function addPokemonToTeam(request, response) {
	console.log("addPokemonToTeam controller");
	var team_name = request.session.team_name;
	var pokemon = request.body.pokemon;
	console.log("controller team_name: " + team_name);
	console.log("pokemon: " + pokemon);
	pokemonModel.addToTeam(team_name, pokemon, function(error, results) {
		if(error) {
			response.json("failed to add pokemon cont");
			throw error;
		} else {
			response.json(results);
		}
	});
}

function getAllTeams(request, response) {
	console.log("all teams control");
	var trainer = request.session.trainer_name;
	pokemonModel.getAllTeams(trainer, function(error, results) {
		if(error) {
			response.json("failed to get pokemon teams");
			throw error;
		} else {
			response.json(results.teams);
		}
	});
}
module.exports = {
	getAllPokemon: getAllPokemon,
	getOnePokemon: getOnePokemon,
	createNewTeam: createNewTeam,
	handleLogin: handleLogin,
	handleLogout: handleLogout,
	handleRegister: handleRegister,
	getUserInfo: getUserInfo,
	getTeamInfo: getTeamInfo,
	addTeam: addTeam,
	addPokemonToTeam: addPokemonToTeam,
	getAllTeams: getAllTeams,
	addNewPokemon: addNewPokemon
};