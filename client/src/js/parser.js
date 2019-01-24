function parser(tfFile) {
  const lineage = tfFile.lineage;
  const serial = tfFile.serial;
  var resourceNames = Object.keys(tfFile.modules[0].resources);
  const dependencies = [];
  var resources = tfFile.modules[0].resources;

  for (var i = 0; i < resourceNames.length; i++) {
    const name = resourceNames[i];
    const type = name.split(".")[0];

    if (!name.startsWith("data")) {
      var resource = resources[name];
      const provider = resource.provider.split(".")[1];
      var attributeData = resource.primary.attributes;
      var attributes = Object.keys(attributeData);
      var resourceAttributesObject = {};
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
  }
  const resourceAttributes = JSON.stringify(resourceAttributesObject);
};

export { parser, serial, lineage, type, name, provider, resourceAttributes, dependencies  }