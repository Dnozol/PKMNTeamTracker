const express = require("express");
require('dotenv').config();
const pokemonController = require("./controllers/pokemonController.js");
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: true
});

var app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var session = require("express-session");
app.use(session({
	name: "trainer_name",
	secret: "secret",
	resave: true,
	saveUninitialized: true
}));
app.get("/allPokemon", pokemonController.getAllPokemon);
app.get("/onePokemon", pokemonController.getOnePokemon);
app.get("/userInfo", pokemonController.getUserInfo);
app.get("/teamInfo", pokemonController.getTeamInfo);
app.get("/getAllTeams", pokemonController.getAllTeams);

app.post("/newPokemon", pokemonController.addNewPokemon);
app.post("/team", pokemonController.createNewTeam);
app.post("/login", pokemonController.handleLogin);
app.post("/logout", pokemonController.handleLogout);
app.post("/register", pokemonController.handleRegister);
app.post("/addTeam", pokemonController.addTeam);
app.post("/addPokemonToTeam", pokemonController.addPokemonToTeam);

/**********Should be in a controller ***************/






//// should be in model as with the {POOL} above


///////    Middleware verifies the user is logged in ///////
function verifyLogin(request, response, next) {
	if(request.session.trainer) {
		// currently logged in
		// proceed
		next();
	} else {
		// not logged in
		var result = {success: false, message: "Access Denied"};
		response.status(401).json(result);
	}
}

/**************************************************/

app.listen(PORT, function() {
	console.log("server listening or port " + PORT);
});