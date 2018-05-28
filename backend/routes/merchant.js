const express = require('express');
const router = express.Router();
const sql = require('./database');
const path = require('path');
const fs = require('fs');
const assert = require('assert');
const multer = require('multer');


const allowedSelfieExtension = ['JPEG', 'PNG'];


// validating the extension of the selfie uploaded by user
const selfieExtensionValidator = (request, file, callback) =>{
	console.log(file.originalname);
	var fileExt = path.extname(file.originalname).toUpperCase();
	if (!fileExt.match(/\.(JPG|JPEG|PNG|GIF)$/)) {
		return callback(new Error('not an image'), false);
	}
	callback(null, true);
}



var storage = multer.diskStorage({
	destination: function(request, file, callback) {
		callback(null, './media')
	},
	filename: function(request, file, callback) {
		console.log(file);
		callback(null, Date.now() + file.originalname)
	},
})



const upload = multer({
		storage: storage,
		fileFilter: selfieExtensionValidator,
	}).single('file');



// controller to get parameters required to make POST API call
router.get('/', (request, response, next) => {
	response.json({'dataparameters': ['Name', 'DOB', 'Selfie']})
})



const postRequestvalidator = (request) => {
	try{
		assert(request.body.merchantId != undefined, "here it is");
		return true
	} catch (err){
		console.log(err);
		return false
	}
}


// Controller for registration of a merchant
router.post('/', (request, response) => {
	upload(request, response, (err) => {
		if (err){
			console.log(err);
			response.status(404).json({"status": "false"});                 // file is not a picture
		} else {
			console.log(request.file);
			sql.insertData(request, (err) => {
				if (err) {
					console.log(err);
					response.status(404).json({"status": "false"});           // response.status(400).json('MerchantId already exists');
				} else{
					response.status(204).json({"status": "true"});  
				}
			})

		}
	})
})



// controller to give requested information about a merchantId
router.get('/getdetails', (request, response) => {
	var merchantId = request.query.merchantId;
	if(merchantId === undefined){
		response.status(400).json('invalid request');                          // merchanitId not provided
	}
	sql.fetchData(merchantId, (err, results) => {
		if (err) {
			response.status(400).json('invalid request')
			console.log(err);
		}
		else {
			if (results.length === 0){ 
				response.status(404).json();                                     // merchant not found
			} else{
				// console.log(results[0].selfiePath);
				var imageAsBase64 = fs.readFileSync('./media/'+results[0].selfiePath, 'base64');
				// console.log(imageAsBase64);	
				response.json({'dataparameters': [{Name:results[0].Name}, {DOB: results[0].DOB}, {selfie: imageAsBase64}]});
			}
		}
	})
})



exports.router = router;
