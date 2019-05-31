import * as OktaJwtVerifier from '@okta/jwt-verifier';

function validateUser(req, res, next) {
    const authHeaders = req.headers.authorization;

    const oktaJwtVerifier = new OktaJwtVerifier({
        clientId: process.env.OKTA_CLIENT_ID,
        issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`
    })

    if (!authHeaders) {
        return next(new Error("Authorization header not found"));
    }

    let parts = authHeaders.trim().split(' ');
    let token = parts.pop();
    oktaJwtVerifier.verifyAccessToken(token)
        .then(jwt => {
            req.user = {
                uid: jwt.claims.uid,
                email: jwt.claims.sub
            }
            next()
        })
        .catch(next);
}

export { validateUser };
