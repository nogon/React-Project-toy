// server program

const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

//app.use(bodyParser.json);
//app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id' : 1,
            'img' : 'https://placeimg.com/64/64/1',
            'name' : '홍길동',
            'birth' : '920523',
            'gender' : '남자',
            'job' : '대학생'
        }, {
            'id' : 2,
            'img' : 'https://placeimg.com/64/64/2',
            'name' : '이순신',
            'birth' : '820523',
            'gender' : '남자',
            'job' : '직장인'
        }, {
            'id' : 3,
            'img' : 'https://placeimg.com/64/64/3',
            'name' : '강감찬',
            'birth' : '720523',
            'gender' : '남자',
            'job' : '프리랜서'
        }
    ]);
});

app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log(`Listening on port ${port}`)
});