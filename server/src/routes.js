const express = require('express');
const routes = express.Router();

const hospedesController = require('./controllers/hospedesController');

routes.post('/hospedes', hospedesController.create);

module.exports = routes;