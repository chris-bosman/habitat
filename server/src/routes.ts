import * as Boom from '@hapi/boom';

import { createResource } from './components/uploadHandler';
import { validate } from './components/verifyAuth';
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
    },
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            validate(request);
        }
    }
];