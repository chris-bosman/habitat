import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as mongoose from 'mongoose';
import * as uuidv4 from 'uuid/v4';

import { connectDb } from './db';
import { Resource } from './models/resource';

const app = new Hapi.Server({
    port: 3000, host: 'localhost',
    routes: { cors: true }
});

const db = require("./db").db;

app.route({
    method: 'POST',
    path: '/upload',
    options: {
        payload: {
            output: 'stream',
            allow: 'multipart/form-data'
        }
    },
    handler: async function (request, reply) {
        try {
            const data = request.payload;
            const name = data["resourceName"];
            const provider = data["resourceProvider"];

            const attributesRaw = data["resourceAttributes"];
            const attributes = Object.keys(attributesRaw).map(function(key) {
                return [String(key), attributesRaw[key]];
            });

            const dependencies = data["resourceDependencies"];

        
            var newResource = new Resource({
                resourceId: uuidv4(),
                resourceName: name,
                resourceProvider: provider,
                resourceDependencies: dependencies,
                resourceAttributes: attributes,
            });

            newResource.save(function (error) {
                if (error) {
                    console.log(error);
                } else return "Successful document upload";
            });
 
        } catch (err) {
            throw Boom.badRequest(err.message, err);
        }
    }
});

// start our app
const init = async () => {

    await app.start();
    console.log(`Server running at: ${app.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();