import * as Boom from "Boom";
import { createResource } from './components/uploadHandler';
import { Resource } from './models/resource';

module.exports = [
    {
        method: 'POST',
        path: '/api/v1/tfstate',
        options: {
            payload: {
                output: 'stream',
                allow: 'multipart/form-data'
            }
        },
        handler: async (request, h) => {
            try {
                await createResource(request);
                return h.response();
            } catch(err) {
                throw Boom.badData(err.message);
            }
        }
    },
    {
        method: 'GET',
        path: '/api/v1/tfstate',
        handler: async (request, h) => {
            try {
                var resource = await Resource.find().exec();
                return h.response(resource);
            } catch (err) {
                throw new Boom(err.message);
            }
        }
    }
];