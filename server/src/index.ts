require('dotenv').config();

import * as express from 'express';
import * as cors from 'cors';

import { validateUser } from './components/auth';
import mongodb from "./components/db";
import router from "./routes";

const app = express();
const port = process.env.PORT;

var corsOptions = {
    origin: process.env.CLIENT_FQDN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
    validateUser(req, res, next);
})

app.use('/', router);

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

app.listen(port, () => console.log(`Server listening at ${process.env.HOST}:${process.env.PORT}`));