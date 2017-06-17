const path = require('path');
const client = require(path.join(__dirname, 'redisConnection'));
const gameStart = require(path.join(__dirname, 'gameStart'));

function pushPlayerToWaitingQueue(playerInfo) {
  client.lpush('waitingQueue', JSON.stringify(playerInfo), (err, count) => {
    // Check 8 players reached
    count === 8 ? gameStart() : null ;
  });
}

module.exports = pushPlayerToWaitingQueue;