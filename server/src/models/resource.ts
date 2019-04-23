import * as mongoose from 'mongoose';
import { IResource } from '../interfaces/resource'

export var resourceSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    resource: {
        type: String,
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
    resourceAttributes: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    resourceDependencies: {
        type: Array,
        default: undefined,
        required: false
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