import * as mongoose from 'mongoose';

interface IResourceDependency extends mongoose.Document {
    resourceDependencies: string;
}

interface IResource extends mongoose.Document {
    _id: string;
    resource: string;
    resourceType: string;
    resourceName: string;
    resourceProvider: string;
    resourceAttributes: any;
    resourceDependencies: Array<IResourceDependency>;
    resourceSerial: number;
    resourceLineage: string;
}

export { IResource };