"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const uuid = require("uuid");
const loadCollection = function (colName, db) {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colName) || db.addCollection(colName);
            resolve(_collection);
        });
    });
};
exports.loadCollection = loadCollection;
const uploader = function (file, options) {
    if (!file)
        throw new Error('no file(s)');
    return Array.isArray(file) ? _filesHandler(file, options) : _fileHandler(file, options);
};
exports.uploader = uploader;
const _filesHandler = function (files, options) {
    if (!files || !Array.isArray(files))
        throw new Error('no files');
    const promises = files.map(x => _fileHandler(x, options));
    return Promise.all(promises);
    console.log(promises);
};
const _fileHandler = function (file, options) {
    if (!file)
        throw new Error('no file');
    // apply filter if exists
    if (options.fileFilter && !options.fileFilter(file.hapi.filename)) {
        throw new Error('type not allowed');
    }
    const orignalname = file.hapi.filename;
    const filename = uuid.v1();
    const path = `${options.dest}${filename}`;
    const fileStream = fs.createWriteStream(path);
    return new Promise((resolve, reject) => {
        file.on('error', function (err) {
            reject(err);
        });
        file.pipe(fileStream);
        file.on('end', function (err) {
            const fileDetails = {
                fieldname: file.hapi.name,
                originalname: file.hapi.filename,
                filename,
                mimetype: file.hapi.headers['content-type'],
                destination: `${options.dest}`,
                path,
                size: fs.statSync(path).size,
            };
            resolve(fileDetails);
        });
    });
};
//# sourceMappingURL=utils.js.map