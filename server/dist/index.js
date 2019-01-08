"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = require("hapi");
const Boom = require("boom");
const fs = require("fs");
const Loki = require("lokijs");
const utils_1 = require("./utils");
// setup
const DB_NAME = 'habitat.json';
const COLLECTION_NAME = 'resources';
const UPLOAD_PATH = 'uploads';
const fileOptions = { dest: `${UPLOAD_PATH}/` };
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });
const resource = require('./models/resource');
// create folder for upload if not exist
if (!fs.existsSync(UPLOAD_PATH))
    fs.mkdirSync(UPLOAD_PATH);
// app
const app = new Hapi.Server({
    port: 3000, host: 'localhost',
    routes: { cors: true }
});
app.route({
    method: 'POST',
    path: '/upload',
    options: {
        payload: {
            output: 'stream',
            allow: 'multipart/form-data' // important
        }
    },
    handler: function (request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = request.payload;
                const file = data['stateFile']; // accept a field call avatar
                // save the file
                const fileDetails = yield utils_1.uploader(file, fileOptions);
                // save data to database
                const col = yield utils_1.loadCollection(COLLECTION_NAME, db);
                const result = [].concat(col.insert(fileDetails));
                db.saveDatabase();
                // return result
                return result.map(x => ({ id: x.$loki, fileName: x.filename, originalName: x.originalname }));
            }
            catch (err) {
                // error handling
                throw Boom.badRequest(err.message, err);
            }
        });
    }
});
// start our app
const init = () => __awaiter(this, void 0, void 0, function* () {
    yield app.start();
    console.log(`Server running at: ${app.info.uri}`);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
//# sourceMappingURL=index.js.map