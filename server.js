const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var mongoose = require('mongoose');
const DB = require('./config/db');
const router = require('./route/root.js');
const app = express();
const cors = require('cors');
app.use((req,res,next)=>
{
    next();
})
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Simple request time logge

app.use(cookieParser());

app.use(router);

app.use(express.static('public'));

app.use('/static', express.static('public'));

app.use(
    session({
        secret: 'arbitary-string',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    })
)

mongoose.connect(DB.DBuri)
.then(res => {
    console.log('Successfully connected to MongoDB!');
})
.catch(err => {
    console.log(err);
});

app.listen(80, () => console.log('Example app listening on port 80!'));