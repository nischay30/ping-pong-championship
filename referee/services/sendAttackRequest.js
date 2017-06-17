function sendAttackRequest({url, score, playerName }, callback) {
const request = require('superagent');
  request
    .post(`${url}/attack`)
    .send({score, playerName})
    .end((err, response) => {
      if(err) { console.log('Error in this request', err); callback(err); return; }
      callback(null, response.body);
    });
}

module.exports = sendAttackRequest;