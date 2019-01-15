import * as mongoose from 'mongoose';
import { IResource } from '../interfaces/schemaInt'

export var resourceSchema = new mongoose.Schema({
    resourceId: {
        type: String,
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


export const Resource = mongoose.model<IResource>("Resource", resourceSchema, "resources");