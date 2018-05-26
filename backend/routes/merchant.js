var express = require('express');
var router = express.Router();
var sql = require('./database')
var multer = require('multer')
var fs = require('fs');

const selfieUpload = (filePath, callback) => {
	fs.writeFile(filepath, "Hey there!", function(err) {
	    if(err) {
	        callback(err)
	    } else{
	    	console.log("The file was saved!");
	    	callback(null);
	    }
	}); 
};

// controller to get parameters required to make POST API call
router.get('/', (request, response) => {
	response.json({'dataparameters': ['Name', 'DOB', 'Selfie']})
})


// Controller for registration of a merchant
router.post('/', (request, response) => {
	var merchanrId = request.body.merchantId;
	var Name = request.body.Name;
	var DOB = request.body.DOB;
	var Headshot = request.body.Headshot;
	var query = `INSERT INTO USERS VALUES (${merchanrId}, ${Name}, ${DOB}`;
	sql.insertData(query, (err, results) => {
		if (err) {
			console.log(err);
			response.status(400).json('MerchantId already exists');
		} else{
			var filepath = merchantId;
			selfieUpload(filepath, Headshot, (err) =>{
				if (err){
					console.log(err);
					response.status(204).send();  // issues while saving file
				}
				else {
					response.status(204).send();
				}
			})
		}
	})
})


// controller to give requested information about a merchantId
router.get('/getmerchant', (request, response) => {
	var merchanrId = request.query.merchanrId;
	var query = `SELECT * FROM User WHERE merchanrId=${merchanrId}`;
	sql.fetchData(query, (err, results) => {
		if (err) {
			console.log(err);
		}
		else {
			console.log(results);
			response.status(204).json({dataparameters: query})
		}
	})
})

exports.router = router;