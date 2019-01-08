"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.resourceSchema = new mongoose.Schema({
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
});
exports.Resource = mongoose.model("Resource", exports.resourceSchema, "habitat");
//# sourceMappingURL=resource.js.map