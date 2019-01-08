function parse(file){
    var tfFile = JSON.parse(file);
    var resourceNames = Object.keys(tfFile.modules[0].resources);
    var dependencyNames = [];

    for (var i = 0; i < resourceNames.length; i++) {
        var name = resourceNames[i];

        if (!name.startsWith('data')) {
            var value = resources[name];
            var data = value.primary.attributes
            var provider = value.provider.split('.')[1];
            // resourceProvider: provider });
            // resourceName: data.name });

            var attributes = Object.keys(data);
            for (var j = 0; j<attributes.length; j++) {
                var attributeName = attributes[j];
                var attributeNameOld = attributeName
                if (attributeName.includes('.')) {
                    attributeName = attributeName.replace(/\./g,'_').replace(/[0-9]/g,'').replace('__','_');
                }
                // document.resourceAttributes.set(attributeName, data[attributeNameOld]);
            };
        } else {
            dependencyNames.push(resources[name].primary.attributes.name);
        }
        // document.set({ resourceDependencies: dependencyNames});
    }
}

module.exports = parse