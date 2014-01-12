assert = require 'assert'
exec = require('child_process').exec
os = require 'os'
describe "Formats phone number", () ->

  describe "Default (e164) from stdin", () ->
    it "Should return +33364515012", (done) ->
      exec "echo 33364515012 | ./pnf", (error, stdout, stderr) ->
        assert.equal stderr, ""
        assert.equal stdout, "+33364515012#{os.EOL}"
        done()
    it "Should return +33364515012", (done) ->
      exec "echo 0364515012 | ./pnf ", (error, stdout, stderr) ->
        assert.equal stderr, ""
        assert.equal stdout, "+33364515012#{os.EOL}"
        done()
    it "Should return +33364515012", (done) ->
      exec "echo 364515012 | ./pnf ", (error, stdout, stderr) ->
        assert.equal stderr, ""
        assert.equal stdout, "+33364515012#{os.EOL}"
        done()

  describe "Default (e164) from args", () ->
    it "Should return +33364515012", (done) ->
      exec "./pnf 33364515012", (error, stdout, stderr) ->
        assert.equal stderr, ""
        assert.equal stdout, "+33364515012#{os.EOL}"
        done()
    it "Should return +33364515012", (done) ->
      exec "./pnf 0364515012", (error, stdout, stderr) ->
        assert.equal stderr, ""
        assert.equal stdout, "+33364515012#{os.EOL}"
        done()
    it "Should return +33364515012", (done) ->
      exec "./pnf 364515012", (error, stdout, stderr) ->
        assert.equal stderr, ""
        assert.equal stdout, "+33364515012#{os.EOL}"
        done()

  describe "International from stdin", () ->
    it "Should return +33 3 64 51 50 12", (done) ->
      exec "echo 33364515012 | ./pnf -international", (error, stdout, stderr) ->
        assert.equal stderr, ""
        assert.equal stdout, "+33 3 64 51 50 12#{os.EOL}"
        done()
    it "Should return +33 3 64 51 50 12", (done) ->
      exec "echo 0364515012 | ./pnf -international", (error, stdout, stderr) ->
        assert.equal stderr, ""
        assert.equal stdout, "+33 3 64 51 50 12#{os.EOL}"
        done()
    it "Should return +33 3 64 51 50 12", (done) ->
      exec "echo 364515012 | ./pnf -international", (error, stdout, stderr) ->
        assert.equal stderr, ""
        assert.equal stdout, "+33 3 64 51 50 12#{os.EOL}"
        done()

  describe "International from args", () ->
    it "Should return +33 3 64 51 50 12", (done) ->
      exec "./pnf -international 33364515012", (error, stdout, stderr) ->
        assert.equal stderr, ""
        assert.equal stdout, "+33 3 64 51 50 12#{os.EOL}"
        done()
    it "Should return +33 3 64 51 50 12", (done) ->
      exec "./pnf -international 0364515012", (error, stdout, stderr) ->
        assert.equal stderr, ""
        assert.equal stdout, "+33 3 64 51 50 12#{os.EOL}"
        done()
    it "Should return +33 3 64 51 50 12", (done) ->
      exec "./pnf -international 364515012", (error, stdout, stderr) ->
        assert.equal stderr, ""
        assert.equal stdout, "+33 3 64 51 50 12#{os.EOL}"
        done()
