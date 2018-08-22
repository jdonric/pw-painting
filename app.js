'use strict'


require('dotenv').config();
var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();

var ENV = process.env.NODE_ENV || 'development';
var SE_USER = process.env.SE_USER;
var SE_PW = process.env.SE_PW;
var SE_HOST = process.env.SE_HOST;


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render('index');
});



app.post('/contact', function (req, res) {
    var message, smtpTrans;
    smtpTrans = nodemailer.createTransport({
       host: 'smtp.gmail.com',
       port: 465,
       secure: true,
    auth: {
        user: SE_USER,
        pass: SE_PW
      }
    });

message = {
    from: SE_HOST,
    to: SE_USER,
    subject: 'QUOTE REQUEST FROM -' + req.body.yEmail,
    text: '<FROM ' + ' ' + req.body.fName + '>' + req.body.description
},
smtpTrans.sendMail(message, function (error, response) {
    if (error) {
      res.send('Quote request FAILED');
    }
    else {
      res.send('Quote request SUCCESSFUL');
    }
  });
});

app.listen(SE_HOST || 3000);


