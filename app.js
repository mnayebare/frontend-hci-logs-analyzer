//
// Description: This file is the main application engine for the application. It sets up the server and the routes for the application.
// Author: Micheal Nayebare
// Created: 2024-26-29
// 


//
// main application front end engine
//
var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var app = express()
const port = parseInt(process.env.PORT, 10) || 4000;
const http = require('http');


//
// call the main page of the application using express set assests folder  to public
//
app.use(express.json());
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
const urlencoded = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
var data = {};

//
// view engine using is html and use the views folder
//
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
var router = express.Router();



//
//set the view engine to html
//
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
  });


app.set('port', port);
const server = http.createServer(app);
server.listen(port);


//
// export the app
//
module.export = app;

