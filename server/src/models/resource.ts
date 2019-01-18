import * as mongoose from 'mongoose';
import { IResource } from '../interfaces/schemaInt'

export var resourceSchema = new mongoose.Schema({
    resourceId: {
        type: String,
        unique: true,
        required: true
    },
    resourceType: {
        type: String,
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
    },
    resourceSerial: {
        required: true,
        type: Number
    },
    resourceLineage: {
        required: true,
        type: String
    }
})


export const Resource = mongoose.model<IResource>("Resource", resourceSchema, "resources");