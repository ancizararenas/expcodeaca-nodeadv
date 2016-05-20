var express  = require('express');
var router   = express.Router();
var log      = require('../middleware/logger').child({
  level : 'info',
  component : '[BIN-SERVER]'
});

router.use(function timeLog(req, res, next) {
  console.log('Request time, type and URL:',Date.now(), req.method, req.originalUrl);
  log.info('Request time, type and URL:',Date.now(), req.method, req.originalUrl)
  next();
});

router.get('/', function (req, res) {
  res.send('Hello World!');
});

router.get('/blog', function(request, response) {
  response.send("This would be some HTML");
});

router.get('/api', function(request, response) {
  response.send({name:"ancizar", age:18});
});

module.exports = router;
