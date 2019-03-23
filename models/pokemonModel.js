function getAllPokemon(callback) {
	//get all pokemon from db
	var results = {
		pokemon: [
		{id : 1, name: "bulbasaur"},
		{id : 2, name: "ivysaur"},
		{id : 3, name: "venusaur"}
		]
	};

	callback(null, results);
}

function getPokemonById(id, callback) {
	// get pokemon with id
	console.log("Searching the DB for pokemon: " + id);
	var results = {id : id, name: "bulbasaur"};
	callback(null, results);
}

function insertNewTeam(name, callback) {
	var results = {success:true};
	callback(null, results);
}

module.exports = {
	getAllPokemon: getAllPokemon,
	getPokemonById: getPokemonById,
	insertNewTeam: insertNewTeam
};