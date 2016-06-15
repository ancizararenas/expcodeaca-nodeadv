'use strict';

var server = require('../../lib/server')();
var assert = require('chai').assert;

describe('lib:server:success', function() {
  assert.ok(server.run());
});
