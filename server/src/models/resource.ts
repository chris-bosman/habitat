import * as mongoose from 'mongoose';
import { IResource } from '../interfaces/schemaInt'

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