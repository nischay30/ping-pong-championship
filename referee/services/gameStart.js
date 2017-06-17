const path = require('path');
const async = require('async');
const client = require(path.join(__dirname, 'redisConnection')).duplicate();
const config = require(path.join(__dirname, '..', 'config'));
const sendAttackRequest = require(path.join(__dirname, 'sendAttackRequest'));
const sendDefendRequest = require(path.join(__dirname, 'sendDefendRequest'));
const pushPlayerToKnockoutQueue = require(path.join(__dirname, 'pushPlayerToKnockoutQueue'));

// Start the game
function gameStart(popQueueName, pushQueueName) {  
  async.waterfall([
    getPlayersForGame.bind(null, popQueueName),
    (players, callback) => {
      let [attackPlayer, defendPlayer] = players;
      attackPlayer.score = 0;
      defendPlayer.score = 0;
      sendAttackAndDefendRequests(attackPlayer, defendPlayer, callback)
    }], (error, winningPlayer) => {
      if(error) { console.log('Error', err); return; }
      pushPlayerToKnockoutQueue(pushQueueName, winningPlayer, gameStart);
  });
}

//two players for game
function getPlayersForGame(popQueueName, callback) {
  async.parallel([
    popPlayerFromWaitingQueue.bind(null, popQueueName),
    popPlayerFromWaitingQueue.bind(null, popQueueName)
  ], (err, players) => {
      if(err) { console.log('Error', err); return; }
      console.log('Players', players);
      callback(null, players);
  });
}

// pop single player for game
function popPlayerFromWaitingQueue(popQueueName, callback) {
  client.brpop(popQueueName, 0, (err, response) => {
    if(err) { callback(err); return; }
    callback(null, JSON.parse(response[1]));
  });
}

// Send attack and defend Requests
function sendAttackAndDefendRequests(attackPlayer, defendPlayer, callback) {
  const playerName1 = attackPlayer.playerName;
  const playerName2 = defendPlayer.playerName;
  async.parallel([
    sendAttackRequest.bind(null, {url: `${config[playerName1]}`, score: attackPlayer.score, playerName: playerName1}),
    sendDefendRequest.bind(null, {url: `${config[playerName2]}`, score: defendPlayer.score, playerName: playerName2}),
  ], (err, results) => {
      if(err) { console.log('Error', err); return; }
      checkWhichPlayerWins(results[0], results[1], callback);
  });
}

// Check which player Wins
function checkWhichPlayerWins(attackPlayer, defendPlayer, callback) {
  const randomNumber = attackPlayer.randomNumber;
  const randomArray = defendPlayer.randomArray;
  if(randomArray.includes(randomNumber)) {
    defendPlayer.score += 1;
    if(!checkSomeoneWinsOrNot(attackPlayer, defendPlayer)) {
    // Switch roles b/w the attacker and defender
      sendAttackAndDefendRequests(defendPlayer, attackPlayer, callback);
    }
    else {
      callback(null, defendPlayer);
    } 
  }
  else {
    attackPlayer.score += 1;
    if(!checkSomeoneWinsOrNot(attackPlayer, defendPlayer)) {
      sendAttackAndDefendRequests(attackPlayer, defendPlayer, callback);
    } 
    else {
     callback(null, attackPlayer);
    }
  }
}

//Check whether round over or nor?
function checkSomeoneWinsOrNot(attackPlayer, defendPlayer) {
  if(attackPlayer.score === 5 || defendPlayer.score === 5) {
    return true;
  }
  return false;
}


module.exports = gameStart;
