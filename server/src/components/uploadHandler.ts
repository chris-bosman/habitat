import { Resource } from '../models/resource';

async function createResource(request) {
    const data = request.payload;
    const serial = data["resourceSerial"];
    const lineage = data["resourceLineage"];
    const type = data["resourceType"];
    const name = data["resourceName"];
    const provider = data["resourceProvider"];
    const attributes= data["resourceAttributes"];
    const dependencies = data["resourceDependencies"];
    const id = type + "." + name + "." + lineage + ".v" + serial;
    const resource = type + "." + name;

    var newResource = new Resource({
        _id: id,
        resource: resource,
        resourceType: type,
        resourceName: name,
        resourceProvider: provider,
        resourceAttributes: attributes,
        resourceDependencies: dependencies,
        resourceSerial: serial,
        resourceLineage: lineage
    });

    var query = { _id: id }
    var options = { new: true, upsert: true, runValidators: true }

    await Resource.findOneAndUpdate(query, newResource, options);
}

export { createResource }