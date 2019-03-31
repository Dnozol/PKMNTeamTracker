const { Pool } = require("pg");
const db_url =  process.env.DATABASE_URL;
const pool = new Pool({connectionString: db_url});
const bcrypt = require('bcrypt');

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

function checkSignIn(trainer_name, password, callback) {
	console.log("in checkSignIn");

	console.log("trainer_name = " + trainer_name);
	var results = {success:false};
	var sql = "SELECT password FROM trainer WHERE trainer_name = $1";
	var params = [trainer_name];
	pool.query(sql, params, function(error, dbResults) {
		if(error){
			throw error;
		} else {
			if(dbResults.rows.length > 0) {
				// if we found the username check the password
				console.log("found the user");
				if(bcrypt.compareSync(password, dbResults.rows[0].password)) {
					console.log("found the password");
					results = {success:true};
				} else {
					results = {success:false};
				} 
			}
			callback(null, results); 
		}
	});	
}

function createTrainer(trainer_name, password, callback) {
	var hash_password = bcrypt.hashSync(password, 10);
	const sql = "INSERT INTO trainer (trainer_name, password) VALUES($1, $2)";
	const params = [trainer_name, hash_password];

	pool.query(sql, params, function(error, results) {
		if(error) {
			console.log("error connecting to db");
			throw error;
			callback(error, null);
		} else {
			console.log("added to db");
			results = {success:true};
			callback(null, results);
		}
	});
}

function addTeamToDb(trainer_name, team_name, callback) {
	// check if the team_name already exists in the DB
	const sql_exists = "SELECT team_name FROM team WHERE team_name = $1 AND team.trainer_id = ( SELECT trainer_id FROM trainer WHERE trainer_name = $2)";
	const params_exists = [team_name, trainer_name];
	// if it doesn't add it to the db
	const sql_addTeam = "INSERT INTO team (team_name, trainer_id) VALUES ($1, ( SELECT trainer_id FROM trainer WHERE trainer_name = $2))";
	const params_addTeam = [team_name,trainer_name];

	var results;
	pool.query(sql_exists, params_exists, function(error, dbResults) {
		if(error) {
			console.log("error connecting to db");
			throw error;
			callback(error, null);
		} else {

			if (dbResults.rows.length > 0) {
				console.log("found");
				results = {success: true,
						   found: true,
						   team: dbResults.rows};
			} else {
				console.log("not found");
				results = {success: true,
						   found: false,
						   team: dbResults.rows};
			}
		}	
			// Check if the team name was found, if found proceed to addpokemontoteam without adding team to DB, not found add to DB
		if (results && results.found) {
			// the team name was found, proceed to addpokemon
			results = {success: true,
					   team_name: team_name};
			callback(null, results);
		} else if (results && (results.found == false)) {
			// its a new team add it to the DB
			pool.query(sql_addTeam, params_addTeam, function(error, dbTeamResults) {
				if(error) {
					console.log("error connecting to db for add team");
					throw error;
					callback(error, null);
				} else {
					console.log("added to DB");
					results = { success: true,
								team_name: team_name};
				}
			});
			callback(null, results);
		}
	});	
}

function addToTeam(team_name, pokemon, callback) {
	//check if team_name already has 6 pokemon on it
	const sql_check_num = "SELECT team_name, pokemon_name " + 
						" FROM team_pokemon tp JOIN team t ON t.team_id = tp.team_id " + 
						" JOIN pokemon p on p.pokemon_id = tp.pokemon_id " +
						" WHERE t.team_id = (SELECT team_id FROM team WHERE team_name = $1) ";

	const params_check_num = [team_name];

	// add pokemon to the team
	const sql_add_pokemon = "INSERT INTO team_pokemon(team_id, pokemon_id) " +
							" VALUES ( (SELECT team_id FROM team WHERE team_name = $1), " +
							" (SELECT pokemon_id FROM pokemon WHERE pokemon_name = $2)); ";
	const params_add_pokemon = [team_name, pokemon];

	var results = {success: false};
	pool.query(sql_check_num, params_check_num, function(error, dbResults) {
		if(error) {
			console.log("error connecting to DB");
			throw error;
			callback(error, null);
		} else {
			if(dbResults.rows.length >= 6) {
				// the team is already full
				results = {success: false,
						   message: "This team already has 6 pokemon on it"};
			} else {
				pool.query(sql_add_pokemon, params_add_pokemon, function(error, dbAddResults) {
				 	console.log("added pokemon model");
				});
				results = {success: true,
						   pokemon: pokemon,
						   team: team_name};
			}
			callback(null, results);
		}
	});
	// if not, add pokemon to team
}

function getAllTeams(trainer, callback) {
	const sql = "SELECT team_name, pokemon_name " + 
				" FROM team_pokemon tp JOIN team t ON t.team_id = tp.team_id " + 
				" JOIN pokemon p on p.pokemon_id = tp.pokemon_id " +
				" WHERE t.trainer_id = (SELECT trainer_id FROM trainer WHERE trainer_name = $1) " +
				" ORDER BY t.team_name";
	const params = [trainer];
	console.log("in get teams model");
	pool.query(sql, params, function(error, dbResults) {
		if(error) {
			console.log("could not connect to DB model");
			throw error;
			callback(error, null);
		} else {
			//return all of the teams
			results = {success: true,
					   teams: dbResults.rows};
			console.log(results);
			callback(null, results);
		}
	});
}

module.exports = {
	getAllPokemon: getAllPokemon,
	getPokemonById: getPokemonById,
	getPokemonByName: getPokemonByName,
	insertNewPokemon: insertNewPokemon,
	checkSignIn: checkSignIn,
	addTeamToDb: addTeamToDb,
	addToTeam: addToTeam,
	createTrainer: createTrainer,
	getAllTeams: getAllTeams,
	insertNewTeam: insertNewTeam
};