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

// 파일 처리를 위한 multer lib 설치 (npm i --save multer)
const multer = require('multer');
// 사용자의 파일이 업로드 되는 공간으로 upload 폴더 만들기
const upload = multer({dest: './upload'})


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

// 사용자가 접근해서 업로드한 파일을 확인할 수 있도록 upload 폴더 공유
// 사용자는 image란 경로로 접근하지만 우리의 실제 서버의 upload와 맵핑이 됨 (image폴더에서 해당 upload 폴더에 접근 할 수 있게 함)
// upload폴더에 직접적으로 접근할 수 없도록 image라는 경로로 표시하고 실제 연결되는 폴더를 upload로
app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('img'), (req, res) => {
    let sql = 'INSERT INTO toy.user VALUES (null, ?, ?, ?, ?, ?)';
    let img = 'http://localhost:5000/image/' + req.file.filename;
    let name = req.body.name;
    let birth = req.body.birth;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [img, name, birth, gender, job];

    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    })
});


app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log(`Listening on port ${port}`)
});