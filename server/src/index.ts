require('dotenv').config();

import * as Hapi from 'hapi';
import * as Boom from 'boom';

import { resourceRoute } from './components/uploadHandler';

const app = new Hapi.Server({
    port: 3000, host: 'localhost',
    routes: { cors: true }
});

app.route({
    method: 'POST',
    path: '/upload',
    options: {
        payload: {
            output: 'stream',
            allow: 'multipart/form-data'
        }
    },
    handler: async function(request, reply) {
        try {
            await resourceRoute(request);
        } catch (err) {
            if (err.code == 11000) {
                return reply.response("This Resource already exists in your Habitat database").code(222);
            } else if (err.message) {
                throw Boom.badRequest(err.message, err);
            } else if (err.errmsg) {
                throw Boom.badRequest(err.errmsg, err);
            }
        }
    }
});

// start our app
const init = async () => {
    await app.start();
    console.log(`Server running at: ${app.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    process.exit(1);
});

init();