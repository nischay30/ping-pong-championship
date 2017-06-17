const path = require('path');
const client = require(path.join(__dirname, 'redisConnection')).duplicate();
const gameStart = require(path.join(__dirname, 'gameStart'));

function pushPlayerToWaitingQueue(playerInfo) {
  client.lpush('waitingQueue', JSON.stringify(playerInfo), (err, count) => {
    // Check 8 players reached
    // if(count === 8)
    if(count === 8)
      gameStart('waitingQueue', 'knockOutQueue');
  });
}

module.exports = pushPlayerToWaitingQueue;