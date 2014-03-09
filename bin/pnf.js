#!/usr/bin/env node
"use strict";

var pnf = require('../lib/pnf.js')

pnf.config({
  argv: process.argv,
  stdin: process.stdin,
  stdout: process.stdout,
  stderr: process.stderr
})
pnf.run(function() {
  process.exit(0)
})
