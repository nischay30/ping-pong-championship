const path = require('path');
const config = require(path.join(__dirname, '..', 'config'));
const request = require('superagent');

function playerJoin(callback) {
  request
    .post(`${config.refereePort}/join`)
    .send({playerName: config.playerName, defenceArrayLength: config.defenceArrayLength})
    .end((error, response) => {
      if(error) { console.log('Error in Joining', error); return; }
      callback(response.body.msg);
    });  
}

module.exports = playerJoin;
