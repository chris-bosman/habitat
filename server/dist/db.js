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
require('dotenv').config();
const mongoose = require("mongoose");
var DB_HOST = process.env.DB_HOST;
var DB_USER = process.env.DB_USER;
var DB_PASS = process.env.DB_PASS;
var DB_NAME = process.env.DB_NAME;
const connString = 'mongodb://' + DB_HOST + '/' + DB_NAME;
exports.dbConfig = {
    useMongoClient: true,
    useNewUrlParser: true
};
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose.Promise = global.Promise;
        try {
            const conn = yield mongoose.connect(connString, exports.dbConfig);
            mongoose.set('useCreateIndex', true);
            mongoose.set('debug', true);
            console.log("Connected to Mongo");
        }
        catch (error) {
            console.error("Could Not Connect to Mongo", error);
        }
    });
}
exports.connectDb = connectDb;
//# sourceMappingURL=db.js.map