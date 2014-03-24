"use strict";
/* global describe, it */
(function() {
  var assert = require('assert')
    , exec = require('child_process').exec
    , os = require('os')
    , stream = require('mock-utf8-stream')
    , bin = './bin/pnf.js'
    , pnf = require('../lib/pnf.js');


  describe("Formats phone number", function() {
    describe("Display the help", function() {
      it("Should diplay help text", function(done) {
        exec("" + bin + " --help", function(error, stdout, stderr) {
          assert.equal(stderr, "");
          assert.equal(
            stdout,
            [
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
          );
          done();
        });
      });
    });
    describe("Error from stdin", function() {
      it("Should return an error for 33", function(done) {
        exec("echo 33 | " + bin, function(error, stdout, stderr) {
          assert.equal(stderr, "33 is not a valid number" + os.EOL);
          assert.equal(stdout, "");
          done();
        });
      });
    });
    describe("Error from args", function() {
      it("Should return an error for 33", function(done) {
        exec("" + bin + " 33", function(error, stdout, stderr) {
          assert.equal(stderr, "33 is not a valid number" + os.EOL);
          assert.equal(stdout, "");
          done();
        });
      });
    });
    describe("Default (e164) from stdin", function() {
      it("Should return +33364515012", function(done) {
        exec("echo 33364515012 | " + bin, function(error, stdout, stderr) {
          assert.equal(stderr, "");
          assert.equal(stdout, "+33364515012" + os.EOL);
          done();
        });
      });

      it("Should return +33364515012", function(done) {
        exec("echo 0364515012 | " + bin + " ", function(error, stdout, stderr) {
          assert.equal(stderr, "");
          assert.equal(stdout, "+33364515012" + os.EOL);
          done();
        });
      });
      it("Should return +33364515012", function(done) {
        exec("echo 364515012 | " + bin + " ", function(error, stdout, stderr) {
          assert.equal(stderr, "");
          assert.equal(stdout, "+33364515012" + os.EOL);
          done();
        });
      });
    });
    describe("Default (e164) from args", function() {
      it("Should return +33364515012", function(done) {
        exec("" + bin + " 33364515012", function(error, stdout, stderr) {
          assert.equal(stderr, "");
          assert.equal(stdout, "+33364515012" + os.EOL);
          done();
        });
      });
      /*
      it("Should return +33364515012", function(done) {
        var stdout = new stream.MockWritableStream(),
          stderr = new stream.MockWritableStream(),
          stdin = new stream.MockReadableStream()
        stdout.startCapture()
        stderr.startCapture()
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
      */

      it("Should return +33364515012", function(done) {
        exec("" + bin + " 0364515012", function(error, stdout, stderr) {
          assert.equal(stderr, "");
          assert.equal(stdout, "+33364515012" + os.EOL);
          done();
        });
      });

      it("Should return +33364515012", function(done) {
        exec("" + bin + " 364515012", function(error, stdout, stderr) {
          assert.equal(stderr, "");
          assert.equal(stdout, "+33364515012" + os.EOL);
          done();
        });
      });
    });
    describe("International from stdin", function() {
      it("Should return +33 3 64 51 50 12", function(done) {
        exec(
          "echo 33364515012 | " + bin + " -international",
          function(error, stdout, stderr) {
            assert.equal(stderr, "");
            assert.equal(stdout, "+33 3 64 51 50 12" + os.EOL);
            done();
          }
        );
      });
      it("Should return +33 3 64 51 50 12", function(done) {
        exec(
          "echo 0364515012 | " + bin + " -international",
          function(error, stdout, stderr) {
            assert.equal(stderr, "");
            assert.equal(stdout, "+33 3 64 51 50 12" + os.EOL);
            done();
          }
        );
      });
      it("Should return +33 3 64 51 50 12", function(done) {
        exec(
          "echo 364515012 | " + bin + " -international",
          function(error, stdout, stderr) {
            assert.equal(stderr, "");
            assert.equal(stdout, "+33 3 64 51 50 12" + os.EOL);
            done();
          }
        );
      });
    });
    describe("International from args", function() {
      it("Should return +33 3 64 51 50 12", function(done) {
        exec(
          "" + bin + " -international 33364515012",
          function(error, stdout, stderr) {
            assert.equal(stderr, "");
            assert.equal(stdout, "+33 3 64 51 50 12" + os.EOL);
            done();
          }
        );
      });
      it("Should return +33 3 64 51 50 12", function(done) {
        exec(
          "" + bin + " -international 0364515012",
          function(error, stdout, stderr) {
            assert.equal(stderr, "");
            assert.equal(stdout, "+33 3 64 51 50 12" + os.EOL);
            done();
          });
      });
      it("Should return +33 3 64 51 50 12", function(done) {
        exec(
          "" + bin + " -international 364515012",
          function(error, stdout, stderr) {
            assert.equal(stderr, "");
            assert.equal(stdout, "+33 3 64 51 50 12" + os.EOL);
            done();
          }
        );
      });
    });
  });

}).call(this);
