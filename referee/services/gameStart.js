const path = require('path');
const async = require('async');
const client = require(path.join(__dirname, 'redisConnection'));
const config = require(path.join(__dirname, '..', 'config'));
const sendAttackRequest = require(path.join(__dirname, 'sendAttackRequest'));
const sendDefendRequest = require(path.join(__dirname, 'sendDefendRequest'));

// pop single player for game
function popPlayerFromWaitingQueue(callback) {
  client.brpop('waitingQueue', 0, (err, response) => {
    if(err) { callback(err); return; }
    callback(null, JSON.parse(response[1]));
  });
}

//two players for game
function getPlayersForGame(callback) {
  async.parallel([
    popPlayerFromWaitingQueue.bind(null),
    popPlayerFromWaitingQueue.bind(null)
  ], (err, players) => {
      if(err) { console.log('Error', err); return; }
      callback(null, players);
  });
}

function sendAttackAndDefendRequests(attackPlayer, defendPlayer, callback) {
  const playerName1 = attackPlayer.playerName;
  const playerName2 = defendPlayer.playerName;
  async.parallel([
    sendAttackRequest.bind(null, {url: `${config[playerName1]}`, score: attackPlayer.score, playerName: playerName1}),
    sendDefendRequest.bind(null, {url: `${config[playerName2]}`, score: defendPlayer.score, playerName: playerName2}),
  ], (err, results) => {
      if(err) { console.log('Error', err); return; }
      console.log(results);
      checkWhichPlayerWins(results[0], results[1], gameOver);
  });
}
function gameOver(player) {
  console.log('Game Over', player);
}

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
      callback(defendPlayer);
    } 
  }
  else {
    attackPlayer.score += 1;
    if(!checkSomeoneWinsOrNot(attackPlayer, defendPlayer)) {
      sendAttackAndDefendRequests(attackPlayer, defendPlayer, callback);
    } 
    else {
     callback(attackPlayer);
    }
  }
}

function checkSomeoneWinsOrNot(attackPlayer, defendPlayer) {
  if(attackPlayer.score === 5 || defendPlayer.score === 5) {
    return true;
  }
  return false;
}

// Start the game
function gameStart() {  
  async.waterfall([
    getPlayersForGame.bind(null),
    (players, callback) => {
      let [attackPlayer, defendPlayer] = players;
      attackPlayer.score = 0;
      defendPlayer.score = 0;
      sendAttackAndDefendRequests(attackPlayer, defendPlayer, callback)    
    }], (error, results) => {

  });
}

module.exports = gameStart;
