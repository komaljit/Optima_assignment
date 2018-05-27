const mysql = require('mysql');


// mysql pool to get connection whiile interacting with database 
const pool = mysql.createPool({
	host: '127.0.0.1',
	port: 3306,
	user: 'root',
	password: '1874@abc',
	database: 'Optima'
});


// function to query data from the database
const fetchData = (request, callback) => {
	pool.getConnection((err, connection) => {
		if (err){
			callback(err);
		} else{
			const sqlQuery = "SELECT * FROM User WHERE merchantId = " + connection.escape(merchantId);
			console.log(sqlQuery);
			connection.query(sqlQuery,(err, rows, fields) => {
				if (err){
					callback(err, null);
				} else{
					callback(null, rows)
				}
				connection.release();
			})
		}
	})
};


// function to insert data into the database
const insertData = (request, callback) => {
	pool.getConnection((err, connection) => {
		if (err) {
			callback(err);
		} else{
			const merchantId = request.body.merchantId;
			const Name = request.body.Name;
			const DOB = request.body.DOB;
			const selfiePath = request.file.filename;
			const sqlQuery = "INSERT INTO User (merchantId, Name, DOB, selfiePath) VALUES (" + 
				connection.escape(merchantId) + "," + connection.escape(Name) + "," + connection.escape(DOB) + "," + connection.escape(selfiePath) +")";
			// console.log(sqlQuery);
			connection.query(sqlQuery, (err, results)=> {
				if (err){
					callback(err);
					connection.release();
				} else{
					callback(null, results);
				}
			})
		}
	})
}


module.exports.insertData = insertData;
module.exports.fetchData = fetchData;