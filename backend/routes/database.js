var mysql = require('mysql');

// mysql pool to get connection whiile interacting with database 
var pool = mysql.createPool({
	host: '127.0.0.1',
	port: 3306,
	user: 'root',
	password: '1874@abc',
	database: 'Optima'
});

// function to query data from the database
const fetchData = (sqlQuery, callback) => {
	pool.getConnection((err, connection) => {
		if (err){
			console.log(err);
		} else{
			connection.query(sqlQuery,(err, rows, fields) => {
				if (err){
					console.log(err)
				} else{
					callback(rows)
				}
				connection.release();
			})
		}
	})
};

// function to insert data into the database
const insertData = (sqlQuery, callback) => {
	pool.getConnection((err, connection) => {
		if (err) {
			console.log(err);
		} else{
			connection.query(sqlQuery, (err, results)=> {
				if (err){
					console.log(err)
				} else{
					callback(results);
				}
				connection.release();
			})
		}
	})
}

module.exports.insertData = insertData;
module.exports.fetchData = fetchData;