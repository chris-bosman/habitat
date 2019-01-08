import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as path from 'path'
import * as fs from 'fs';
import * as Loki from 'lokijs';
import * as mongoose from 'mongoose';

import {
    loadCollection, uploader
} from './utils';

// setup
const DB_NAME = 'habitat.json';
const COLLECTION_NAME = 'resources';
const UPLOAD_PATH = 'uploads';
const fileOptions = { dest: `${UPLOAD_PATH}/` };
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });
const resource = require('./models/resource');

// create folder for upload if not exist
if (!fs.existsSync(UPLOAD_PATH)) fs.mkdirSync(UPLOAD_PATH);

// app
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
            allow: 'multipart/form-data' // important
        }
    },
    handler: async function (request, reply) {
        try {
            const data = request.payload;
            const file = data['stateFile']; // accept a field call avatar
            // save the file
            const fileDetails = await uploader(file, fileOptions);

            // save data to database
            const col = await loadCollection(COLLECTION_NAME, db);
            const result = [].concat(col.insert(fileDetails));
            db.saveDatabase();

            // return result
            return result.map(x => ({ id: x.$loki, fileName: x.filename, originalName: x.originalname }));

        } catch (err) {
            // error handling
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