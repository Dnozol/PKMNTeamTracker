const express = require("express");
require('dotenv').config();
const pokemonController = require("./controllers/pokemonController.js");
const PORT = process.env.PORT || 5000;

var app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var session = require("express-session");
app.use(session({
	name: "trainer_name",
	secret: "secret",
	saveUnintialized: true
}));
app.get("/allPokemon", pokemonController.getAllPokemon);
app.get("/onePokemon", pokemonController.getOnePokemon);

app.post("/newPokemon", pokemonController.addNewPokemon);
app.post("/team", pokemonController.createNewTeam);
app.post("/login", handleLogin);
app.post("/logout", handleLogout);

/**********Should be in a controller ***************/

function handleLogin(request, response) {
	var result = {success: false};

	if (request.body.trainer_name == "admin" && request.body.password == "password") {
		request.session.trainer = request.body.trainer_name;
		result = {success: true};
	}
	response.json(result);
}

function handleLogout(request, response) {
	var result = {success: false};
	if(request.session.trainer) {
		request.session.destroy();
		result = {success: true};
	}
	response.json(result);
}

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