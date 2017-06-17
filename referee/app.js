const express = require('express');
const app = express();
const path = require('path');
const config = require(path.join(__dirname, 'config'));

app.listen(config.expressPort, (err, res) => {
  if(err) { console.log('Error', err); return; }
  console.log(`Referee Server Started on ${config.expressPort}`);
});