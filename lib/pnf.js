'use strict';
var PNF = require('google-libphonenumber').PhoneNumberFormat
  , phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
  , readline = require('readline')
  , os = require('os')
  , pnf = {}
;

pnf.config = function(config) {
  this.argv = config.argv;
  this.stdin = config.stdin;
  this.stdout = config.stdout;
  this.stderr = config.stderr;
  this.numbers = [];
  this.help = false;
};

pnf.options = {
  format: PNF.E164
  , lang: 'FR'
};

pnf.numbers = [];
pnf.help = false;

pnf.format = function(number) {
  var parsedNumber = phoneUtil.parse(number, this.options.lang);

  if (!phoneUtil.isValidNumber(parsedNumber)) {
    pnf.stderr.write(
      number + ' is not a valid number' + os.EOL
    );

    return false;
  }

  pnf.stdout.write(
    phoneUtil.format(parsedNumber, this.options.format) + os.EOL
  );
};

pnf.args = function(arg) {
  switch (true) {
    case arg === '-help':
    case arg === '--help':
      pnf.stdout.write(
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
      pnf.help = true;
      break;
    case arg === '-intl':
    case arg === '--intl':
    case arg === '-international':
    case arg === '--international':
      pnf.options.format = PNF.INTERNATIONAL;
      break;
    case arg === '-e164':
    case arg === '--e164':
      pnf.options.format = PNF.E164;
      break;
    case arg.substr(0, 6) === '-lang=':
    case arg.substr(0, 7) === '--lang=':
      pnf.options.lang = arg.split('=')[1];
      break;
    default:
      pnf.numbers.push(arg);
      break;
  }
};

pnf.run = function(next) {
  var rl;
  this.argv.shift();
  this.argv.shift();
  this.argv.forEach(this.args);

  if (this.help === true) {
    next();
  }

  if (pnf.numbers.length === 0) {
    rl = readline.createInterface({
      input: this.stdin
      , output: function() {}
    });

    rl.on('line', function(line) {
      pnf.format(line);
    });

    rl.on('close', function() {
      next();
    });
  } else {
    pnf.numbers.forEach(function(number) {
      pnf.format(number);
    });
    next();
  }
};

module.exports = pnf;
