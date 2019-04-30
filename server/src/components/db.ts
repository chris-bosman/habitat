import * as mongoose from 'mongoose';

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

export default mongodb;