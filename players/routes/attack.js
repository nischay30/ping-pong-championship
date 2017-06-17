function attack(req, res) {
  selectRandomNumber(req, res);
}

function selectRandomNumber(req, res) {
  const randomNumber = Math.floor((Math.random()*(11-1)) + 1);
  let playerInfo = req.body;
  playerInfo.randomNumber = randomNumber;
  res.json(playerInfo);
}

module.exports = attack;