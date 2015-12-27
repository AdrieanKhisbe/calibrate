'use strict';

const Hapi = require('hapi');
const Calibrate = require('calibrate');
const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register([
    { register: Calibrate.decorate }    // Register decorator, used in third example
], (err) => {

    if (err) {
        throw err;
    }

    server.route([
        {
            method: 'GET',
            path: '/user/{id}',
            handler: function (request, reply) {            // Using Promises

                const promise = User.findById(request.params.id)
                    .then(Calibrate.response)               // Formats Response
                    .catch(Calibrate.error);                // Errors caught and wrapped
                return reply(promise);                      // Return Calibrated Response
            }
        },
        {
            method: 'GET',
            path: '/team/{id}',
            handler: function (request, reply) {            // Using Callbacks

                Team.findById(request.params.id, (err, team) => {

                    if (err) {                              // Catch any errors
                        return reply(Calibrate.error(err)); // Errors caught and wrapped
                    }

                    return reply(Calibrate.response(team)); // Return Calibrate Response
                });
            }
        },
        {
            method: 'GET',
            path: '/team/{id}',
            handler: function (request, reply) {            // Using new decorator function

                Team.findById(request.params.id, (err, team) => {

                    if (err) {                               // Catch any errors
                        return reply.calibrate(err);        // Using decorator function
                    }

                    return reply.calibrate(team);           // Using decorator function
                });
            }
        }
    ]);

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
