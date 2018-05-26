var express = require('express');
var router = express.Router();


 module.exports.invalidRequest = router.use((request, response) => {
 	response.send('Invalid response');
 });
