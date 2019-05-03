import * as mongoose from 'mongoose';

require('dotenv').config();

const connString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const dbConfig: mongoose.ConnectionOptions = {
    useNewUrlParser: true
};

(<any>mongoose).Promise = Promise;
mongoose.connect(connString, dbConfig);
mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);

let mongodb = mongoose.connection;

export default mongodb;