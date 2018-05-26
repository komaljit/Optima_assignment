var express = require('express');
var session = require('express-session');
var merchant = require('./routes/merchant');
var invalidRequest = require('./invalid_request');


var app = express();

app.use('/', merchant.router);

// handling the invalid requets
app.use('/', invalidRequest.invalidRequest);

app.listen(3000);
