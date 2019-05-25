require('dotenv').config();

import * as OktaJwtVerifier from '@okta/jwt-verifier';
import * as Boom from '@hapi/boom';
import { isNullOrUndefined } from 'util';

const verifier = new OktaJwtVerifier({
    clientId: process.env.OKTA_CLIENT_ID,
    issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`
});

const validate = (request) => {
    const authHeaders = request.headers.authorization
    if (!authHeaders) {
        throw Boom.badData('Authorization header is required');
    } else {
        let parts = request.headers.authorization.trim().split(' ');
        let accessToken = parts.pop();
    
        verifier.verifyAccessToken(accessToken)
            .then(jwt => {
                request.user = {
                    uid: jwt.claims.uid,
                    email: jwt.claims.sub
                }
            });
    
        return request.user
    }
}


export { validate }
