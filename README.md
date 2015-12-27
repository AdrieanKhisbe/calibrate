Calibrate
=========

[![NPM Version](https://img.shields.io/npm/v/calibrate.svg)](https://npmjs.org/package/calibrate)
[![Build Status](https://travis-ci.org/johnbrett/calibrate.svg?branch=master)](https://travis-ci.org/johnbrett/calibrate)
[![Coverage Status](https://coveralls.io/repos/johnbrett/calibrate/badge.svg?branch=master&service=github)](https://coveralls.io/github/johnbrett/calibrate?branch=master)
[![Dependency Status](https://david-dm.org/johnbrett/calibrate.svg)](https://david-dm.org/johnbrett/calibrate)

*Micro library for providing uniform json output for RESTful APIs, with error handling.*

Feel free to raise an issue or contact me on twitter if you have any questions [@johnbrett_](https://www.twitter.com/johnbrett_). Beginners, feature requests and bug reports are welcomed.

*Please star if you using this module so I know where to focus my time spent on open source work.*

**Usage:**
```javascript
const Calibrate = require('calibrate')

/**
* Checks whether data is an error, calls either Calibrate.error or Calibrate.reponse
**/
Calibrate(data [, meta])

// Valid response structure:
{
    "statusCode": ...,
    "data":       ...,
    "meta":       ...
}

// Error response structure:
{
    "statusCode": ...,
    "error":      ...,
    "message":    ...
}

/**
* If data is non-null and defined:
*  -  wraps value in object with statusCode and meta properties
* If null or undefined
*  -  returns a Boom notFound error object
**/
Calibrate.response(data [, meta])

/**
* If is a Boom Error object
*  - returns object as is
* If is a non Boom Error Object
*  - returns a Boom badImplementaion Error Object
**/
Calibrate.error(data)

/**
* **For use with Hapi.js framework (http://hapijs.com)**
* Decorates the reply interface with the calibrate method
**/
Calibrate.decorate // register as a hapijs plugin

```
### Examples in Hapijs

You can find examples in the repo: see [basic-calibration](./examples/basic-calibration.js) example



License MIT @ John Brett
