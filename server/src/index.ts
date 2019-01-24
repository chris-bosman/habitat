require('dotenv').config();

import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as mongoose from 'mongoose';

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

mongodb.on("error", err => {
    console.log("Unable to connect to database", err);
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
            const serial = data["resourceSerial"];
            const lineage = data["resourceLineage"];
            const type = data["resourceType"];
            const name = data["resourceName"];
            const provider = data["resourceProvider"];
            const attributesRaw = data["resourceAttributes"];
            const dependencies = data["resourceDependencies"];
            const id = type + "." + name;
            const attributes = JSON.parse(attributesRaw);

            var newResource = new Resource({
                resourceId: id,
                resourceType: type,
                resourceName: name,
                resourceProvider: provider,
                resourceDependencies: dependencies,
                resourceAttributes: attributes,
                resourceSerial: serial,
                resourceLineage: lineage,
            });

            const query = { resourceId: id, resourceSerial: { $lt: serial }};

            await Resource.findOneAndUpdate(query, newResource, { upsert: true, new: true }, function(err) { });

            return { message: "Successfully saved document" };

        } catch (err) {
            throw Boom.badRequest(err.errmsg, err);
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