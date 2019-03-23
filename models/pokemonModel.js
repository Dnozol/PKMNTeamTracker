const { Pool } = require("pg");

const db_url =  process.env.DATABASE_URL;

const pool = new Pool({connectionString: db_url});

function getAllPokemon(callback) {
	//get all pokemon from db

	var sql = "SELECT pokemon_id, pokemon_name FROM pokemon";

	pool.query(sql, function (err, dbResults) {
		if(err) {
			throw err;
		} else {
			// we got some successful results from the db
			console.log("Back from db with: ");
			console.log(dbResults);

			var results = {
				success:true,
				pokemon:dbResults.rows
			};

			callback(null, results);
		}
	});
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