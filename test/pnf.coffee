assert = require 'assert'
exec = require('child_process').exec
os = require 'os'
describe "Formats phone number", () ->
  describe "Default (e164)", () ->
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
