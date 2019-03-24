const express = require("express");
require('dotenv').config();
const pokemonController = require("./controllers/pokemonController.js");
const PORT = process.env.PORT || 5000;

var app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/allPokemon", pokemonController.getAllPokemon);
app.get("/onePokemon", pokemonController.getOnePokemon);

app.post("/newPokemon", pokemonController.addNewPokemon);
app.post("/team", pokemonController.createNewTeam);

app.listen(PORT, function() {
	console.log("server listening or port " + PORT);
});