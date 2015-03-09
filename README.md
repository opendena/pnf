pnf
===

[![NPM version](https://img.shields.io/npm/v/pnf.svg?style=flat-square)](https://npmjs.org/package/pnf)
[![Build Status](https://img.shields.io/travis/opendena/pnf.svg?style=flat-square)](https://travis-ci.org/opendena/pnf)
[![Coverage Status](https://img.shields.io/coveralls/opendena/pnf.svg?style=flat-square)](https://coveralls.io/r/opendena/pnf?branch=master)
[![Codacy Badge](https://img.shields.io/codacy/5531e65615c04f00a3698fafb4cb2bc7.svg?style=flat-square)](https://www.codacy.com/public/opendena/pnf.git)
[![Code Climate](https://img.shields.io/codeclimate/github/opendena/pnf.svg?style=flat-square)](https://codeclimate.com/github/opendena/pnf)
[![Dependency Status](https://img.shields.io/david/opendena/pnf.svg?style=flat-square)](https://david-dm.org/opendena/pnf) 
[![devDependency Status](https://img.shields.io/david/dev/opendena/pnf.svg?style=flat-square)](https://david-dm.org/opendena/pnf#info=devDependencies)
[![license](https://img.shields.io/npm/l/pnf.svg?style=flat-square)](http://opensource.org/licenses/BSD-2-Clause)

`pnf` is a command line tool for formatting phone number 

## Getting Started

```bash
npm install -g pnf
```

## Examples 

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
