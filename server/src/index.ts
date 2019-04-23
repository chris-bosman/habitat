require('dotenv').config();

import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as mongoose from 'mongoose';

import { createResource } from './components/uploadHandler';

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
mongoose.set('useFindAndModify', false);

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
    handler: async function(request, h) {
        try {
            await createResource(request);
            return h.response();
        } catch(err) {
            throw Boom.badData(err.message);
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