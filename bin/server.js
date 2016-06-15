#!/usr/bin/env node

'use strict';

// pre server runtime config
if (process.env.NODE_ENV === 'test') {
  process.env.MONGO = 'mongodb://localhost:27017/nodeadvca-test'
}

//
// run the cli server
//

var server = require('../lib/server')();

server.run(function(err) {
  if (err) {
    throw err;
  }
});
