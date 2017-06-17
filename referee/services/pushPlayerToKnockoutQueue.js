const path = require('path');
const client = require(path.join(__dirname, 'redisConnection')).duplicate();

function pushPlayerToKnockOutQueue(pushQueueName, playerInfo, callback) {
  client.lpush(pushQueueName, JSON.stringify(playerInfo), (err, count) => {
    // Check 4 players reached
    console.log('Round Winner', playerInfo);
    console.log('Count', count);
    if(count === 2 && pushQueueName === 'finalQueue') {
      callback('finalQueue', 'winnerQueue');
    }else if(count === 4 || pushQueueName === 'finalQueue') {
      callback('knockOutQueue', 'finalQueue');
    } else if(pushQueueName === 'winnerQueue') {
      console.log('Game Over');
    } else {
      callback('waitingQueue', pushQueueName);      
    }
  });
}


module.exports = pushPlayerToKnockOutQueue;