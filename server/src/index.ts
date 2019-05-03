require('dotenv').config();

import * as Hapi from 'hapi';
import mongodb from "./components/db";

var routes = require('./routes');

const app = new Hapi.Server({
    port: process.env.PORT, host: process.env.HOST,
    routes: { cors: true }
});

app.route(routes);

mongodb.on("error", err => {
    console.log("Unable to connect to database", err);
});

mongodb.once("open", () => {
    console.log("Connected to database");
});

const init = async () => {
    await app.start();
    console.log(`Server running at: ${app.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

export default app;