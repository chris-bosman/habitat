require('dotenv').config();

import * as mongoose from 'mongoose';

var DB_HOST = process.env.DB_HOST
var DB_USER = process.env.DB_USER;
var DB_PASS = process.env.DB_PASS;
var DB_NAME = process.env.DB_NAME;

const connString = 'mongodb://' + DB_HOST + '/' + DB_NAME;
export const dbConfig: mongoose.ConnectionOptions = {
    useMongoClient: true,
    useNewUrlParser: true
};

export async function connectDb() {
    (<any>mongoose).Promise = global.Promise;
    try {
        const conn = await mongoose.connect(connString, dbConfig);
        mongoose.set('useCreateIndex', true);
        mongoose.set('debug', true);

        console.log("Connected to Mongo");
    } catch (error) {
        console.error("Could Not Connect to Mongo", error);
    }
}