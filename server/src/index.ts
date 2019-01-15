require('dotenv').config();

import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as mongoose from 'mongoose';
import * as uuidv4 from 'uuid/v4';

import { Resource } from './models/resource';

const app = new Hapi.Server({
    port: 3000, host: 'localhost',
    routes: { cors: true }
});

const connString = 'mongodb://localhost:27017/habitat';
const dbConfig: mongoose.ConnectionOptions = {
    useNewUrlParser: true
};

(<any>mongoose).Promise = Promise;
mongoose.connect(connString, dbConfig);
mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

let mongodb = mongoose.connection;

mongodb.on("error", error => {
    console.log("Unable to connect to database", error);
});

mongodb.once("open", () => {
    console.log("Connected to database");
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
    handler: async function (request, reply) {
        try {
            const data = request.payload;
            const name = data["resourceName"];
            const provider = data["resourceProvider"];
            const attributesRaw = data["resourceAttributes"];
            const dependencies = data["resourceDependencies"];
            const attributes = JSON.parse(attributesRaw);
        
            var newResource = new Resource({
                resourceId: uuidv4(),
                resourceName: name,
                resourceProvider: provider,
                resourceDependencies: dependencies,
                resourceAttributes: attributes,
            });

            newResource.save();

            return "Successfully saved document";
 
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