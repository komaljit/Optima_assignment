const express = require('express');
const session = require('express-session');
const merchant = require('./routes/merchant');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const invalidRequest = require('./invalid_request');

const app = express();

app.use(logger('dev'));

app.use('./media', express.static(path.join(__dirname, 'media')));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


app.use('/', merchant.router);

// handling the invalid requests
app.use('/', invalidRequest.router);

app.listen(process.env.PORT || 3000);

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});