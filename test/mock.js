'use strict';
/* global describe, it, beforeEach */
var assert = require('assert')
  , os = require('os')
  , stream = require('mock-utf8-stream')
  , nodeStream = require('stream')
  , pnf


describe('Use mocks/stubs', function() {
  var stdout = new stream.MockWritableStream()
    , stderr = new stream.MockWritableStream()
    , stdin = new nodeStream.PassThrough()
    , help = [
      'Usage: pnf [options] [numbers...]'
      , '   or: [numbers...] | pnf [options]'
      , ''
      , 'Description:'
      , ''
      , 'Phone number format'
      , ''
      , 'Options'
      , ''
      , '  -intl, --intl            Internationnal format'
      , '  -e164, --e164            e164 format (default)'
      , '  -lang, --lang            Language (ISO 639-1, default is FR)'
      , ''
    ].join(os.EOL)


  beforeEach(function(done) {
    stderr.clearCapturedData()
    stdout.clearCapturedData()
    stdout.startCapture()
    stderr.startCapture()
    stdin = new nodeStream.PassThrough()
    pnf = require('../lib/pnf.js')
    done()
  })

  it('Should return +33364515012', function(done) {
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
      assert.equal(stderr.capturedData, '')
      assert.equal(stdout.capturedData, '+33364515012' + os.EOL)
      done()
    })
    stdin.write('364515012' + os.EOL)
    stdin.end()
  })

  it('Should diplay help text', function(done) {
    pnf.config({
      stdin: stdin,
      stdout: stdout,
      stderr: stderr,
      argv: [
        'node',
        'pnf.js',
        '--help'
      ]
    })
    pnf.run(function(){
      assert.equal(stderr.capturedData, '');
      assert.equal(
        stdout.capturedData,
        help
      );
      done();
    });
  });

  it('Should diplay help text', function(done) {
    pnf.config({
      stdin: new nodeStream.PassThrough(),
      // stdin: stdin,
      stdout: stdout,
      stderr: stderr,
      argv: [
        'node',
        'pnf.js',
        '-help'
      ]
    })
    pnf.run(function(){
      assert.equal(stderr.capturedData, '');
      assert.equal(
        stdout.capturedData,
        help
      );
      done();
    });
  });

  it('Should return +33364515012', function(done) {
    pnf.config({
      stdin: stdin,
      stdout: stdout,
      stderr: stderr,
      argv: [
        'node',
        'pnf.js',
        '33364515012'
      ]
    })
    pnf.run(function() {
      assert.equal(stderr.capturedData, '')
      assert.equal(stdout.capturedData, '+33364515012' + os.EOL)
      done()
    })
  });

  it('Should return +33364515012', function(done) {
    pnf.config({
      stdin: stdin,
      stdout: stdout,
      stderr: stderr,
      argv: [
        'node',
        'pnf.js',
        '-e164',
        '33364515012'
      ]
    })
    pnf.run(function() {
      assert.equal(stderr.capturedData, '')
      assert.equal(stdout.capturedData, '+33364515012' + os.EOL)
      done()
    })
  });

  it('Should return +33364515012', function(done) {
    pnf.config({
      stdin: stdin,
      stdout: stdout,
      stderr: stderr,
      argv: [
        'node',
        'pnf.js',
        '-e164',
        '-lang=FR',
        '33364515012'
      ]
    })
    pnf.run(function() {
      assert.equal(stderr.capturedData, '')
      assert.equal(stdout.capturedData, '+33364515012' + os.EOL)
      done()
    })
  });

  it('Should return 33364515012', function(done) {
    pnf.config({
      stdin: stdin,
      stdout: stdout,
      stderr: stderr,
      argv: [
        'node',
        'pnf.js',
        '-intl',
        '0364515012'
      ]
    })
    pnf.run(function() {
      assert.equal(stderr.capturedData, '')
      assert.equal(stdout.capturedData, '+33 3 64 51 50 12' + os.EOL)
      done()
    })
  });

  it('Should return an error', function(done) {
    pnf.config({
      stdin: stdin,
      stdout: stdout,
      stderr: stderr,
      argv: [
        'node',
        'pnf.js',
        '5013'
      ]
    })
    pnf.run(function() {
      assert.equal(stderr.capturedData, '5013 is not a valid number' + os.EOL)
      assert.equal(stdout.capturedData, '')
      done()
    })
  });
})

