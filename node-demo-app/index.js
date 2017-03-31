'use strict';
/*
* Hapijs is a framework used for building robust applicationa and APIs in nodeJS
* https://hapijs.com/
* Good is a logging plugin for Hapi
* https://github.com/hapijs/good
*/
const Hapi = require('hapi');
const Good = require('good');

// Create a server and have it listen on port 80
const server = new Hapi.Server();
server.connection({ port: 80 });

/*
* Routes are valid paths that can be used for our API. Values in {braces}
* are the variables that we pass in. This path will accept 2 numbers and return
* the sum back to the end user.
*/
server.route({
    method: 'GET',
    path: '/{num1}/plus/{num2}',
    handler: function (request, reply) {
        var sum = parseInt(request.params.num1) + parseInt(request.params.num2)
        reply(sum.toString());
    }
});

/*
* This route is used so that the application load balancer can validate that
* our application is up and running.
*/
server.route({
    method: 'GET',
    path: '/healthcheck',
    handler: function (request, reply) {
        reply("Your service is healthy");
    }
});

/*
* This is the function that will start our server. The first few lines register
* any plugings. In this case we register good-console which allows us to see
* all of the logs through the console to help up with any debugging. Below
* the server gets started.
*/
server.register({
    register: Good,
    options: {
        reporters: {
            console: [ {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err;
    }

    server.start((err) => {
        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
