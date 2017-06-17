const request = require('superagent');

function sendAttackRequest({url, score, playerName }, callback) {
  request
    .post(`${url}/attack`)
    .send({score, playerName})
    .end((err, response) => {
      if(err) { console.log('Error', err); callback(err); return; }
      callback(null, response.body);
    });
}

module.exports = sendAttackRequest;