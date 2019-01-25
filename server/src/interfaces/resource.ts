import * as mongoose from 'mongoose';

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