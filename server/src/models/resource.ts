import * as mongoose from 'mongoose';
import parse from '../parser';

interface IResourceDependency extends mongoose.Document {
    resourceDependencies: string;
}

interface IResourceAttributes extends mongoose.Document {
    attributeName: string;
    attributeValue: string;
}

interface IResource extends mongoose.Document {
    resourceId: mongoose.Types.ObjectId;
    resourceName: string;
    resourceProvider: string;
    resourceDependencies: Array<IResourceDependency>;
    resourceAttributes: Map<IResourceAttributes['attributeName'],IResourceAttributes['attributeValue']>;
}

export var resourceSchema = new mongoose.Schema({
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true
    },
    resourceName: {
        type: String,
        required: true
    },
    resourceProvider: {
        type: String,
        required: true
    },
    resourceDependencies: {
        type: Array,
        default: undefined,
        required: false
    },
    resourceAttributes: {
        required: true,
        type: Map,
        of: String
    }
})


export const Resource = mongoose.model<IResource>("Resource", resourceSchema, "habitat");