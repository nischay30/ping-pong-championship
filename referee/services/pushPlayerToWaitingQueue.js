const path = require('path');
const client = require(path.join(__dirname, 'redisConnection'));

function pushPlayerToWaitingQueue(playerInfo) {
  client.lpush('waitingQueue', JSON.stringify(playerInfo), (err, response, count) => {
    console.log(count);
  });
}

module.exports = pushPlayerToWaitingQueue;