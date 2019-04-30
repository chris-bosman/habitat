import store from "../store";

function tfStateParser(reader, event) {
  const formData = new FormData();

  var tfFile = JSON.parse(reader.result);
  var lineage = tfFile.lineage;
  var serial = tfFile.serial;
  var resources = tfFile.modules[0].resources;
  var resourceNames = Object.keys(resources);
  var dependencies = [];
  var resourceAttributesObject = {};

  formData.append("resourceSerial", serial);
  formData.append("resourceLineage", lineage);

  for (var i = 0; i < resourceNames.length; i++) {
    var name = resourceNames[i];

    if (!name.startsWith("data")) {
      var type = name.split(".")[0];
      var resource = resources[name];
      var provider = resource.provider.split(".")[1];
      var attributeData = resource.primary.attributes;
      var resourceName = attributeData.name;
      var attributes = Object.keys(attributeData);

      formData.append("resourceName", resourceName);
      formData.append("resourceProvider", provider);
      formData.append("resourceType", type);

      for (var j = 0; j < attributes.length; j++) {
        var attributeName = attributes[j];
        var attributeNameOld = attributeName;
        if (attributeName.includes(".")) {
          attributeName = attributeName
            .replace(/\./g, "_")
            .replace(/[0-9]/g, "")
            .replace("__", "_");
        }

        if (attributeName.includes("%")) {
          attributeName = attributeName.replace("%", "number");
        }

        if (attributeName.includes("#")) {
          attributeName = attributeName.replace("#", "number");
        }

        resourceAttributesObject[attributeName] =
          attributeData[attributeNameOld];
      }
    } else {
      dependencies.push(resources[name].primary.attributes.name);
      formData.append("resourceDependencies", dependencies);
    }
  }
  var resourceAttributes = JSON.stringify(resourceAttributesObject);
  formData.append("resourceAttributes", resourceAttributes);
  store.dispatch("uploadResult", { formData, event });
}

export { tfStateParser };
