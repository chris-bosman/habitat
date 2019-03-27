import { Resource } from '../models/resource';

async function resourceRoute(request) {
    const data = request.payload;
    const serial = data["resourceSerial"];
    const lineage = data["resourceLineage"];
    const type = data["resourceType"];
    const name = data["resourceName"];
    const provider = data["resourceProvider"];
    const attributesRaw = data["resourceAttributes"];
    const dependencies = data["resourceDependencies"];
    const id = type + "." + name + "." + lineage + ".v" + serial;
    const resource = type + "." + name;
    const attributes = JSON.parse(attributesRaw);

    console.log(request.payload);

    var newResource = new Resource({
        _id: id,
        resource: resource,
        resourceType: type,
        resourceName: name,
        resourceProvider: provider,
        resourceDependencies: dependencies,
        resourceAttributes: attributes,
        resourceSerial: serial,
        resourceLineage: lineage,
    });

    const query = { _id: id, resourceSerial: { $lt: serial }, resourceLineage: { $ne: lineage }};

    await Resource.findOneAndUpdate(query, newResource, { upsert: true, new: true });

    return "Success";
}

export { resourceRoute }