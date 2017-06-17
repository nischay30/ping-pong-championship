const Router = require('express').Router();
const joining = require('./joining');

Router.use(require('body-parser').json());

Router.post('/join', joining);

module.exports = Router;