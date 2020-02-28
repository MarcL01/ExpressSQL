// All the requirements
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

// Initialize express
const app = express();


// Use the body-parser json middleware
// This will automatically parse JSON into req.body
app.use(bodyParser.json());


// This will render any files that are located in ../public
// IE: localhost:3000/index.html will render the index.html
app.use(express.static(path.join(__dirname, '../public')));


// retrieve all data from the database
app.get('/database', (req, res) => {
    // Select everything from our 'data' table
    db.queryAsync(`SELECT * FROM data`).then((results) => {
        // Send the results back to the client in JSON
        res.json(results[0]);
        res.end();
    }).catch((error) => {
        console.log(error);
        // HTTP code 500 is for Internal Server Error
        res.status(500).end();
    });
});


// add data to the database
app.post('/database', (req, res) => {
    // Try to find our text in either the body or the query
    let text = req.body.text || req.query.text;
    // We couldn't find text, so lets tell the client to
    // add text in either the body or query
    if (!text) {
        // HTTP code 400 is for Bad Request which is the case here
        res.status(400).end();
        // don't run anymore code past this point
        return;
    }
    // This will insert a new row into data with the colum 'text' set to our variable text
    // You can also do: 'INSERT INTO data(text) VALUES(?)', both will work
    db.queryAsync(`INSERT INTO data SET text = ?`, [text]).then((data) => {
        res.status(200).end();
    }).catch((error) => {
        console.log(error);
        // HTTP code 500 is for Internal Server Error
        res.status(500).end();
    })
});

const port = 3000;
app.listen(port, () => {
    console.log(`Successfully started on port: ${port}`);
})