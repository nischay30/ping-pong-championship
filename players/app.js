const express = require('express');
const app = express();
const path = require('path');
const config = require(path.join(__dirname, 'config'));

// app.use(require(path.join(__dirname, 'routes', 'router')));

app.listen(config.expressPort, (err, res) => {
  if(err) { console.log('Error', err); return; }
  console.log(`Player ${config.playerName} Server Started on ${config.expressPort}`);
});

//Trigger request to join the game
require(path.join(__dirname, 'services', 'playerJoin'))( (message) => {
  console.log(message);
});



