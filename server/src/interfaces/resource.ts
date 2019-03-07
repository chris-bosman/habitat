import * as mongoose from 'mongoose';

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

interface IResourceDependency extends mongoose.Document {
    resourceDependencies: string;
}

interface IResourceAttributes extends mongoose.Document {
    attributeName: string;
    attributeValue: string;
}

interface IResource extends mongoose.Document {
    _id: string;
    resource: string;
    resourceType: string;
    resourceName: string;
    resourceProvider: string;
    resourceDependencies: Array<IResourceDependency>;
    resourceAttributes: Map<IResourceAttributes['attributeName'],IResourceAttributes['attributeValue']>;
    resourceSerial: number;
    resourceLineage: string;
}

export { IResource };