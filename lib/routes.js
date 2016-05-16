var log    = require('../middleware/logger').child({
  level : 'info',
  component : '[ROUTES]'
});

function registerRoutes(router){
  router.get('/', function (req, res) {
    log.info('successfully recieved request for home page');
    res.type('text/plain');
    res.send('Hello World!');
  });

  router.get('/blog', function(request, response) {
      log.info('successfully recieved request for blog');
      response.send("This would be some HTML");
  });

  router.get('/api', function(request, response) {
      log.info('successfully recieved request for API');
      response.send({name:"ancizar", age:18});
  });
};


module.exports = {
  register : registerRoutes
};
