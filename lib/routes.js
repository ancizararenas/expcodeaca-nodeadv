var router = require('express').Router(); // instantiate express router - new in Express 4.0 ^
var log = require('../middleware/logger').child({ // I'm sure there is a better way of doing this without requiring logger again
  level : 'info',
  component : '[BIN-SERVER]'
});

router.get('/', function (req, res) {
	log.info('Requested root');
  	res.send('Hello World!');
});

router.get('/blog', function(request, response) {
  	log.info('Requested /blog');
    response.send("This would be some HTML");
});

router.get('/api', function(request, response) {
	log.info('Requested /api');
    response.send({name:"ancizar", age:18});
});

module.exports = router;