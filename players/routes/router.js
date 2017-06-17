const Router = require('express').Router();
const path = require('path');
const attack = require(path.join(__dirname, 'attack'));
const defend = require(path.join(__dirname, 'defend'));

Router.use(require('body-parser').json());

Router.post('/attack', attack);
Router.post('/defend', defend);

module.exports = Router;
