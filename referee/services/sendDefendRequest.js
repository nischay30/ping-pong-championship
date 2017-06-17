const request = require('superagent');

function sendDefendRequest({url, score, playerName }, callback) {
  request
    .post(`${url}/defend`)
    .send({score, playerName})
    .end((err, response) => {
      if(err) { console.log('Error', err); callback(err); return; }
      callback(null, response.body);
    });
}

module.exports = sendDefendRequest;
