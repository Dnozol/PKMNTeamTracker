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
	var sql = "SELECT pokemon_id, pokemon_name, type_1, type_2 FROM pokemon WHERE pokemon_id=$1::integer";
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
	console.log("Searching the DB for pokemon name: " + name);
	var sql = "SELECT pokemon_id, pokemon_name, type_1, type_2 FROM pokemon WHERE UPPER(pokemon_name) LIKE UPPER($1::text)";
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

function insertNewPokemon(name, type1, type2, callback) {
	console.log("Adding new pokemon");
	var sql = "INSERT INTO pokemon (pokemon_name, type_1, type_2) VALUES ($1::text, $2::text, $3::text)";
	var params = [name, type1, type2];
	pool.query(sql, params, function(err, dbResults) {
		if (err) {
			throw err;
		} else {
			console.log("Added to database");
			var results = {pokemon: dbResults.rows};
			callback(null, results);
		}
	});
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

module.exports = {
	getAllPokemon: getAllPokemon,
	getPokemonById: getPokemonById,
	getPokemonByName: getPokemonByName,
	insertNewPokemon: insertNewPokemon,
	insertNewTeam: insertNewTeam
};