"use strict";
var assert = require('assert')
  , exec = require('child_process').exec
  , os = require('os')
  , stream = require('mock-utf8-stream')
  , nodeStream = require('stream')
  , readline = require('readline')
  , pnf = require('../lib/pnf.js')


describe('Use mocks/stubs', function() {
  it("Should return +33364515012", function(done) {
    var stdout = new stream.MockWritableStream()
      , stderr = new stream.MockWritableStream()
      , stdin = new nodeStream.PassThrough()
    stdout.startCapture()
    stderr.startCapture()
    pnf.config({
      stdin: stdin,
      stdout: stdout,
      stderr: stderr,
      argv: [
        'node',
        'pnf.js'
      ]
    })
    pnf.run(function() {
      assert.equal(stderr.capturedData, "")
      assert.equal(stdout.capturedData, '+33364515012' + os.EOL)
      done()
    })
    stdin.write('364515012' + "\n")
    stdin.end()
  })
})

