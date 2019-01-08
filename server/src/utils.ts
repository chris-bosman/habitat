import * as del from 'del';
import * as Loki from 'lokijs';
import * as fs from 'fs';
import * as uuid from 'uuid';

interface FileUploaderOption {
    dest: string;
    fileFilter?(fileName: string): boolean;
}

interface FileDetails {
    fieldname: string;
    originalname: string;
    filename: string;
    mimetype: string;
    destination: string;
    path: string;
    size: number;
}

const loadCollection = function (colName, db: Loki): Promise<Loki.Collection<any>> {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colName) || db.addCollection(colName);
            resolve(_collection);
        })
    });
}

const uploader = function (file: any, options: FileUploaderOption) {
    if (!file) throw new Error('no file(s)');

    return Array.isArray(file) ? _filesHandler(file, options) : _fileHandler(file, options);
}

const _filesHandler = function (files: any[], options: FileUploaderOption) {
    if (!files || !Array.isArray(files)) throw new Error('no files');

    const promises = files.map(x => _fileHandler(x, options));
    return Promise.all(promises);
}

const _fileHandler = function (file: any, options: FileUploaderOption) {
    if (!file) throw new Error('no file');

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
            const fileDetails: FileDetails = {
                fieldname: file.hapi.name,
                originalname: file.hapi.filename,
                filename,
                mimetype: file.hapi.headers['content-type'],
                destination: `${options.dest}`,
                path,
                size: fs.statSync(path).size,
            }

            resolve(fileDetails);
        })
    })
}

export { loadCollection, uploader }