#!/usr/bin/env node
"use strict";
var libphonenumber = require('libphonenumber');
var readline = require('readline');
var os = require('os');
var pnf = {};
var numbers = [];

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
        console.error(
          number + " is not a valid number"
        );
      }
      if (result) {
        console.log(result);
      }
    }
  )
}

process.argv.shift()
process.argv.shift()
process.argv.forEach(function(arg) {
  switch(true) {
    case arg == '-help':
    case arg == '--help':
      console.log(
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
          '  -lang, --lang            Language (ISO 639-1, default is FR)'
        ].join(os.EOL)
      );
      process.exit(0);
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
    input: process.stdin,
    output: function() {}
  });

  rl.on('line', function(line) {
    line = line.replace(/\r?\n|\r/g, ''); // Nodejs 0.8 issue
    pnf.format(line)
  })

  rl.on('end', function() {
    process.exit(0);
  });
} else {
  numbers.forEach(function(number) {
    pnf.format(number)
  })
}
