'use strict';

var respond;
var log = require('../middleware/logger').child({
      level : 'info',
      component : '[MIDDLEWARE-RESPOND]'
    });

respond = module.exports = function(err, req, res, next) {
  if (err || (res.statusCode > 201)) {
    var error = {};
    error.statusCode = err.statusCode || res.statusCode || 500;
    error.message = err.message || res || 'Internal server error encountered';

    log.error({message : 'error encountered processing request'}, {error : error});
    return res.status(error.statusCode).json({message : error.message});
  }

  log.info({message : 'request successfully processed'}, {responseBody : res});
  res.status(res.statusCode || 200).json(res);
  next();
};
