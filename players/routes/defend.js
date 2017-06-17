const path = require('path');
const config = require(path.join(__dirname, '..', 'config'));

function defend(req, res) {
  generateRandomArray((array) => {
    let playerInfo = req.body;
    playerInfo.randomArray = array;
    res.json(playerInfo);
  });
}

function generateRandomArray(callback) {
  const array= Array.from({length: config.defenceArrayLength}, () => Math.floor((Math.random()*(11-1)) + 1));
  callback(array);
}

module.exports = defend;
