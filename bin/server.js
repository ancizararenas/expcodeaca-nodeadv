
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoURI = process.env.MONGO || 'mongodb://localhost:2701/nodeadvcodeacademy';
var log = require('../middleware/logger').child({
  level : 'info',
  component : '[BIN-SERVER]'
});


var port = process.env.PORT || 3000;

app.listen(port){
  //console.log("Node JS  App listening on port:3000");
  log.info("Server started on port %s", port);
})

mongoose.connection.on('connected', function () {
   log.info("Successfully connected to DB %s", mongoURI);
 });
 mongoose.connection.on('error', function (err) {
   log.error("Error connecting to DB %s", mongoURI, err);
 });

 // middleware to use for all requests
 router.use(function(req, res, next) {
   log.info({req : req},
     {message : req.method + ' - request being made to - ' + req.originalUrl});
   next(); // make sure we go to the next routes and don't stop here
 });
