const express = require('express');
const router = express.Router();
const sql = require('./database');
const path = require('path');
const fs = require('fs');
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
	}
})


const upload = multer({
		storage: storage,
		fileFilter: selfieExtensionValidator,
	}).single('file');


// function to save merchant photo in media folder
const selfieUpload = (filePath, callback) => {
	fs.writeFile(filePath, "Hey ", function(err) {
	    if(err) {
	        callback(err)
	    } else{
	    	console.log("The file was saved!");
	    	callback(true);
	    }
	});
};


// controller to get parameters required to make POST API call
router.get('/', (request, response) => {
	response.json({'dataparameters': ['Name', 'DOB', 'Selfie']})
})


// Controller for registration of a merchant
router.post('/register', (request, response) => {
	upload(request, response, (err) => {
		if (err){
			console.log(err);
			response.status(400).json({"status": "false"});                 // file is not a picture
		} else {
			console.log(request.file);
			sql.insertData(request, (err) => {
				if (err) {
					console.log(err);
					response.status(400).json({"status": "false"});          // response.status(400).json('MerchantId already exists');
				} else{
					var filePath = path.join(__dirname, '../media/', request.body.merchantId);
					console.log(filePath);
					selfieUpload(filePath, (err) =>{
						if (err){
							console.log(err);
							response.status(400).json({"status": "false"});  // issues while saving file
						}
						else {
							response.status(204).json({"status": "true"});    // details saved succesfully
						}
					})
				}
			})
		}

	})
})


// controller to give requested information about a merchantId
router.get('/profile', (request, response) => {
	var merchanrId = request.query.merchanrId;
	sql.fetchData(query, request, (err, results) => {
		if (err) {
			response.status(400).json('invalid request')
			console.log(err);
		}
		else {
			console.log(results);
			response.status(204).json({dataparameters: query})
		}
	})
})


exports.router = router;
