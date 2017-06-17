module.exports = {
  expressPort: process.env.EXPRESS_PORT || 8081,
  playerName: process.env.PLAYER_NAME || 'Nikhil',
  defenceArrayLength: process.env.DEFENCE_ARRAY_LENGTH || 8,
  refereePort: process.env.REFEREE_PORT || 'http://localhost:8080'
}