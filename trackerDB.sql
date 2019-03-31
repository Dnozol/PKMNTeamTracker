-- DROP TABLE team_pokemon;
-- DROP TABLE trainer;
-- DROP TABLE pokemon;
-- DROP TABLE team;

-- Create tables
CREATE TABLE trainer
( trainer_id 	SERIAL PRIMARY KEY
, trainer_name  VARCHAR(20) NOT NULL UNIQUE
, password 		VARCHAR(255) NOT NULL
);

CREATE TABLE pokemon
( pokemon_id 	SERIAL PRIMARY KEY
, pokemon_name 	VARCHAR(20) UNIQUE NOT NULL
, type_1 		VARCHAR(8) NOT NULL
, type_2 		VARCHAR(8)
);

CREATE TABLE team
( team_id 	 SERIAL PRIMARY KEY
, team_name	 VARCHAR(20) NOT NULL UNIQUE
, trainer_id INT
, CONSTRAINT fk_trainer_id FOREIGN KEY (trainer_id)
  REFERENCES trainer(trainer_id)
);

INSERT INTO team (team_name, trainer_id)
VALUES ('team1', (SELECT trainer_id from trainer WHERE trainer_name = 'admin'));

CREATE TABLE team_pokemon
( team_pokemon_id SERIAL PRIMARY KEY
, team_id    INT REFERENCES team(team_id)
, pokemon_id INT REFERENCES pokemon(pokemon_id)
);

INSERT INTO pokemon
( pokemon_name
, type_1
, type_2
)
VALUES
( 'Bulbasaur', 'Grass', 'Poison'),
( 'Ivysaur', 'Grass', 'Poison'),
( 'Venusaur', 'Grass', 'Poison'),
( 'Charmander', 'Fire', NULL),
( 'Charmeleon', 'Fire', NULL),
( 'Charizard', 'Fire', 'Flying'),
( 'Squirtle', 'Water', NULL),
( 'Wartortle', 'Water', NULL),
( 'Blastoise', 'Water', NULL),
( 'Caterpie', 'Bug', NULL),
( 'Metapod', 'Bug', NULL),
( 'Butterfree', 'Bug', 'Flying'),
( 'Weedle', 'Bug', 'Poison'),
( 'Kakuna', 'Bug', 'Poison'),
( 'Beedrill', 'Bug', 'Poison'),
( 'Pidgey', 'Normal', 'Flying'),
( 'Pidgeotto', 'Normal', 'Flying'),
( 'Pidgeot', 'Normal', 'Flying'),
( 'Rattata', 'Normal', NULL),
( 'Raticate', 'Normal', NULL),
( 'Spearow', 'Normal', 'Flying'),
( 'Fearow', 'Normal', 'Flying'),
( 'Ekans', 'Poison', NULL),
( 'Arbok', 'Poison', NULL),
( 'Pikachu', 'Electric', NULL),
( 'Raichu', 'Electirc', NULL);

INSERT INTO team 
(team_name) VALUES ('EXAMPLE');

INSERT INTO team_pokemon
VALUES
( DEFAULT
, (SELECT team_id FROM team WHERE team_name = 'EXAMPLE')
, (SELECT pokemon_id FROM pokemon WHERE pokemon_name = 'Pikachu')
);

INSERT INTO team_pokemon
VALUES
( DEFAULT
, (SELECT team_id FROM team WHERE team_name = 'EXAMPLE')
, (SELECT pokemon_id FROM pokemon WHERE pokemon_name = 'Caterpie')
);

INSERT INTO team 
(team_name) VALUES ('EXAMPLE2');


INSERT INTO team_pokemon
VALUES
( DEFAULT
, (SELECT team_id FROM team WHERE team_name = 'EXAMPLE2')
, (SELECT pokemon_id FROM pokemon WHERE pokemon_name = 'Charmander')
);

INSERT INTO team_pokemon
VALUES
( DEFAULT
, (SELECT team_id FROM team WHERE team_name = 'EXAMPLE2')
, (SELECT pokemon_id FROM pokemon WHERE pokemon_name = 'Bulbasaur')
);


SELECT team.team_id, team_name, pokemon_id, trainer.trainer_id
FROM team, trainer, team_pokemon
WHERE team.team_id = team_pokemon.team_id
AND team.trainer_id = trainer.trainer_id;

SELECT *
FROM team_pokemon, team
WHERE team_pokemon.team_id = 1;

INSERT INTO team_pokemon (team_id, pokemon_id)
VALUES 
( (SELECT team_id from team where team_name = 'team1' and team.trainer_id = 1)
, (SELECT pokemon_id from pokemon where pokemon_name = 'Charmander')
);

select * from team, team_pokemon
WHERE team.team_id = 1
and team_pokemon.team_id = (select team_id from team where team_name = 'team1');

select *
from team_pokemon, team
where team_pokemon.team_id = 1;

INSERT INTO team_pokemon (team_id, pokemon_id)
VALUES (
(SELECT team_id from team where team_name = 'team1'),
3
);

SELECT team_name, pokemon_name 
FROM team_pokemon tp 
JOIN team t ON t.team_id = tp.team_id 
JOIN pokemon p on p.pokemon_id = tp.pokemon_id
WHERE t.team_id = (SELECT team_id FROM team WHERE team_name = 'team1');


SELECT team_name, pokemon_name 
FROM team_pokemon tp 
JOIN team t ON t.team_id = tp.team_id 
JOIN pokemon p on p.pokemon_id = tp.pokemon_id
WHERE t.trainer_id = (SELECT trainer_id FROM trainer WHERE trainer_name = 'admin')
ORDER BY t.team_name;

INSERT INTO team_pokemon
VALUES
( DEFAULT
, (SELECT team_id FROM team WHERE team_name = 'team2')
, (SELECT pokemon_id FROM pokemon WHERE pokemon_name = 'Squirtle')
);