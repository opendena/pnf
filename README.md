pnf
===

[![NPM version](https://badge.fury.io/js/pnf.png)](https://npmjs.org/package/pnf)
[![Build Status](https://travis-ci.org/opendena/pnf.png?branch=master)](https://travis-ci.org/opendena/pnf)
[![Coverage Status](https://coveralls.io/repos/opendena/pnf/badge.png?branch=master)](https://coveralls.io/r/opendena/pnf?branch=master)
[![Dependency Status](https://david-dm.org/opendena/pnf.png)](https://david-dm.org/opendena/pnf) 
[![devDependency Status](https://david-dm.org/opendena/pnf/dev-status.png)](https://david-dm.org/opendena/pnf#info=devDependencies)

`pnf` is a command line tool for formatting phone number 

## Getting Started

```bash
npm install -g pnf
```

### Examples 

```bash
echo 364515012 | pnf
echo "364515012
364515012" | pnf
$ +33364515012
$ +33364515012
echo 364515012 | pnf --international
$ +33 3 64 51 50 12
echo 13602092771 | pnf --lang=US --international
$ +1 360-209-2771
cat fileWithNumbers | pnf
$ ...
```
