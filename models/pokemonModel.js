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

// Find one pokemon by its number
function getPokemonById(id, callback) {
	// get pokemon with id
	console.log("Searching the DB for pokemon: " + id);
	var sql = "SELECT pokemon_id, pokemon_name FROM pokemon WHERE pokemon_id=$1::integer";
	var params = [id];
	pool.query(sql, params, function(err, dbResults) {
		if(err) {
			throw err;
		} else {
			console.log("Single Search with: ");
			console.log(dbResults);
			var results = {pokemon: dbResults.rows};
			callback(null, results);	
		}
	});
}

// Find one pokemon by its name
function getPokemonByName(name, callback) {
	console.log("Searching the DB for pokemon: " + name);
	var sql = "SELECT pokemon_id, pokemon_name FROM pokemon WHERE pokemon_name=$1::text";
	var params = [name];
	pool.query(sql, params, function(err, dbResults) {
		if(err) {
			throw err;
		} else {
			console.log("Single Search with: ");
			console.log(dbResults);
			var results = {pokemon: dbResults.rows};
			callback(null, results);
		}
	});
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