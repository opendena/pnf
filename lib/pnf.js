#!/usr/bin/env node
"use strict";
var libphonenumber = require('libphonenumber')
var readline = require('readline')
var os = require('os')
var numbers = [];
var pnf = {}

pnf.config = function(config) {
  this.argv = config.argv
  this.stdin = config.stdin
  this.stdout = config.stdout
  this.stderr = config.stderr
}

pnf.options = {
  format: 'e164',
  lang: 'FR'
}

pnf.format = function(number) {
  libphonenumber[this.options.format](
    number,
    this.options.lang,
    function(error, result) {
      if (error) {
        pnf.stderr.write(
          number + " is not a valid number" + os.EOL
        );
      }
      if (result) {
        pnf.stdout.write(result + os.EOL)
      }
    }
  )
}

pnf.run = function(next) {
  this.argv.shift()
  this.argv.shift()
  this.argv.forEach(function(arg) {
    switch(true) {
      case arg == '-help':
      case arg == '--help':
        pnf.stdout.write(
          [
            'Usage: pnf [options] [numbers...]',
            '   or: [numbers...] | pnf [options]',
            '',
            'Description:',
            '',
            'Phone number format',
            '',
            'Options',
            '',
            '  -intl, --intl            Internationnal format',
            '  -e164, --e164            e164 format (default)',
            '  -lang, --lang            Language (ISO 639-1, default is FR)',
            ''
          ].join(os.EOL)
        );
        next()
        break;
      case arg == '-intl':
      case arg == '--intl':
      case arg == '-international':
      case arg == '--international':
        pnf.options.format = 'intl';
        break;
      case arg == '-e164':
      case arg == '--e164':
        pnf.options.format = 'e164';
        break;
      case arg.substr(0,6) == '-lang=':
      case arg.substr(0,7) == '--lang=':
        pnf.options.lang = arg.split('=')[1];
        break;
      default:
        numbers.push(arg);
        break;
    }
  })

  if (numbers.length === 0) {
    var rl = readline.createInterface({
      input: this.stdin,
      output: function() {}
    });

    rl.on('line', function(line) {
      pnf.format(line)
    })

    rl.on('end', function() {
      next();
    });
  } else {
    numbers.forEach(function(number) {
      pnf.format(number)
    })
    next()
  }
}

module.exports = pnf;