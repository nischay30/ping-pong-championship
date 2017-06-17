const path = require('path');
const pushPlayerToWaitingQueue = require(path.join(__dirname, '..', 'services', 'pushPlayerToWaitingQueue'));

module.exports = (req, res) => {
  pushPlayerToWaitingQueue(req.body);
  res.json({msg: `${req.body.playerName} Joined the Game`});
}