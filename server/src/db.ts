require('dotenv').config();

import * as mongoose from 'mongoose';

var DB_HOST = process.env.DB_HOST
var DB_USER = process.env.DB_USER;
var DB_PASS = process.env.DB_PASS;
var DB_NAME = process.env.DB_NAME;

const connString = 'mongodb://' + DB_HOST + '/' + DB_NAME;
export const dbConfig: mongoose.ConnectionOptions = {
    useNewUrlParser: true
};

export async function connectDb() {
    (<any>mongoose).Promise = Promise;
    mongoose.connect(connString, dbConfig);
    mongoose.set('useCreateIndex', true);
    mongoose.set('debug', true);

    let mongodb = mongoose.connection;

    mongodb.on("error", () => {
        console.log("Unable to connect to database");
    });

    mongodb.once("open", () => {
        console.log("Connected to database");
    });
}