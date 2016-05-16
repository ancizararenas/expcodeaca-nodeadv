var log = require('../middleware/logger').child({
  level : 'info',
  component : '[LIB-ROUTES]'
});

function registerRoutes(router) {
  router.get('/', function (req, res) {
  log.info("request to / received");
  res.send('Hello World!');
  });

  router.get('/blog', function(request, response) {
    log.info("request to /blog received");
    response.send("This would be some HTML");
  });

  router.get('/api', function(request, response) {
    log.info("request to /api received");
    response.send({name:"ancizar", age:18});
  });
};

module.exports = {
  register : registerRoutes
};
