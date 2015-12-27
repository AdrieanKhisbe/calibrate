'use strict';

const Boom = require('boom');
const Defined = require('isdefined').has_value;

const internals = {};

/**
 * Evaluates data as to whether it is an error or not and calls error or response as appropriate
 * @param data
 * @param meta
 * @param options
 * @returns {*}
 */
internals.calibrate = module.exports = function calibrate (data, meta, options) {

    return (data instanceof Error)? internals.error(data): internals.response(data, meta, options);
};

/**
 * If error is a Boom error object, return as is
 * Else return a Boom badImplementation error object
 */
internals.error = module.exports.error = function (err) {

    return (err.isBoom) ? err: Boom.badImplementation(err);
};

/**
 * If data is defined and non-null, wrap with statusCode and meta object properties
 * Else return Boom notFound error object
 */
internals.response = module.exports.response = function response (data, _meta, _options) {

    const meta = _meta || {};
    const options = _options || {};

    if (Defined(data)) {
        return {
            statusCode: 200,
            data: data,
            meta: meta
        };
    }

    const context = options.context ? options.context + ' ' : '';
    const returnString = (options.return_string || options.returnString)
                        || 'The ' + context + 'resource with that ID does not exist or has already been deleted.';

    return Boom.notFound(returnString);
};

/**
 * When used in plugin.register, will decorate the reply interface with the calibrate method
 * so reply.calibrate() can be called
 */
internals.decorate = module.exports.decorate = function decorate (server, options, next) {

    const decorator = function (res){

        return this.response(internals.calibrate(res));
    };
    server.decorate('reply', 'calibrate', decorator);

    next();
};

internals.decorate.attributes = {
    pkg: require('../package.json')
};
