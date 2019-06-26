import { ResourceModel } from '../interfaces/resource';

async function createResource(req) {
    try {
        const data = req.body;
        const serial = data["resourceSerial"];
        const lineage = data["resourceLineage"];
        const type = data["resourceType"];
        const name = data["resourceName"];
        const provider = data["resourceProvider"];
        const attributes= data["resourceAttributes"];
        const dependencies = data["resourceDependencies"];
        const id = type + "." + name + "." + lineage + ".v" + serial;
        const resource = type + "." + name;

        if (data && id && resource && type && name && provider && attributes && dependencies && serial && lineage) {
            var newResource = new ResourceModel({
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
        
            return ResourceModel.findOneAndUpdate(query, newResource, options);
        } else {
            throw new Error('Unable to validate provided data.')
        }    
    } catch(error) {
        throw new Error(error);
    }
}

export { createResource }