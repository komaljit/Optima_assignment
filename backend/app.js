const express = require('express');
const session = require('express-session');
const merchant = require('./routes/merchant');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const invalidRequest = require('./invalid_request');


const app = express();

app.use(logger('dev'));

app.use('./public/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

// console.log(merchant.router);

app.use('/', merchant.router);

// handling the invalid requests
app.use('/', invalidRequest.router);

app.listen(3000);
