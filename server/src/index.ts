require('dotenv').config();

import * as Hapi from '@hapi/hapi';

import mongodb from "./components/db";
import { validate } from './components/verifyAuth';

const routes = require('./routes');

const init = async () => {
    const app = new Hapi.Server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: { 
            cors: true
        }
    });

    app.route(routes);

    await app.start();
    console.log(`Server running at: ${app.info.uri}`);
};

mongodb.on("error", err => {
    console.log("Unable to connect to database", err);
});

mongodb.once("open", () => {
    console.log("Connected to database");
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
