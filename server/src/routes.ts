import * as Boom from "Boom";
import { createResource } from './components/uploadHandler';

module.exports = [{
    method: 'POST',
    path: '/api/v1/tfstate',
    options: {
        payload: {
            output: 'stream',
            allow: 'multipart/form-data'
        }
    },
    handler: async function(request, h) {
        try {
            await createResource(request);
            return h.response();
        } catch(err) {
            throw Boom.badData(err.message);
        }
    }
}];