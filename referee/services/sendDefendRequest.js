function sendDefendRequest({url, score, playerName }, callback) {
const request = require('superagent');
  request
    .post(`${url}/defend`)
    .send({score, playerName})
    .end((err, response) => {
      if(err) { console.log('Error here also', err); callback(err); return; }
      callback(null, response.body);
    });
}

module.exports = sendDefendRequest;
