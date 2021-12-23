// server program

const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
// DB연결
//const db = require('/dbconnection');
const fs = require('fs');
const data = fs.readFileSync('./dbconnection.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: conf.host,
    port: conf.port,
    user:conf.user,
    password: conf.password,
    database: conf.database
})
connection.connect();


//app.use(bodyParser.json);
//app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    connection.query('SELECT * FROM toy.user',
    (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query error : ${err}`);
            res.send(err);
        }
    });
});

app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log(`Listening on port ${port}`)
});