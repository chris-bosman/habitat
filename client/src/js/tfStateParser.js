import { upload } from "./uploadService";

function tfStateParser(formData, reader) {
  var tfFile = JSON.parse(reader.result);
  var lineage = tfFile.lineage;
  var serial = tfFile.serial;
  var resources = tfFile.modules[0].resources;
  var resourceNames = Object.keys(resources);
  var dependencies = [];
  var resourceAttributesObject = {};
  var provider = "";
  var type = "";
  var name = "";

  for (var i = 0; i < resourceNames.length; i++) {
    name = resourceNames[i];
    type = name.split(".")[0];

    if (!name.startsWith("data")) {
      var resource = resources[name];
      provider = resource.provider.split(".")[1];
      var attributeData = resource.primary.attributes;
      var attributes = Object.keys(attributeData);
      for (var j = 0; j < attributes.length; j++) {
        var attributeName = attributes[j];
        var attributeNameOld = attributeName;
        if (attributeName.includes(".")) {
          attributeName = attributeName
            .replace(/\./g, "_")
            .replace(/[0-9]/g, "")
            .replace("__", "_");
        }
        resourceAttributesObject[attributeName] =
          attributeData[attributeNameOld];
      }
    } else {
      dependencies.push(resources[name].primary.attributes.name);
    }
    var resourceAttributes = JSON.stringify(resourceAttributesObject);
    formData.append("resourceSerial", serial);
    formData.append("resourceLineage", lineage);
    formData.append("resourceType", type);
    formData.append("resourceName", name);
    formData.append("resourceProvider", provider);
    formData.append("resourceAttributes", resourceAttributes);
    formData.append("resourceDependencies", dependencies);
  }
  upload(formData);
}

export { tfStateParser };
