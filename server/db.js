// All the requirements
const mysql = require('mysql');
const Promise = require('bluebird');


// If you get errors in this area then you need to
// run 'mysql -u root < server/schema.sql' to import
// the schema
let connection = mysql.createConnection({
    user: 'root',
    password: 'root1234',
    database: 'simple'
});


// Creates promise versions of all methods for our connection/database
const db = Promise.promisifyAll(connection, { multiArgs: true });


// Exports db so we can access it in other files
// using require
module.exports = db;