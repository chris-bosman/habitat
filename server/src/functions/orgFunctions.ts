const axios = require('axios');

const oktaHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `SSWS ${process.env.OKTA_API_TOKEN}`
};

async function getUser(oktaHeaders) {
    const user = await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users/me`,
        method: 'GET',
        headers: oktaHeaders
    });
    
    const userId = user.data.id;

    return userId;
}

async function getOrg(oktaHeaders) {
    const currentUser = await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users/me`,
        method: 'GET',
        headers: oktaHeaders
    });

    var orgName = currentUser.data.profile.organization;

    const orgUsers = await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users`,
        method: 'GET',
        headers: oktaHeaders
    });

    console.log(orgUsers);
    return orgUsers;
}

async function postToOkta(oktaHeaders, profile, oktaUserId) {
    await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users/${oktaUserId}`,
        method: 'POST',
        headers: oktaHeaders,
        data: profile
    });
}

async function orgCreate(req) {
    var oktaUserId = await getUser(oktaHeaders);
    const orgName = req.body.organization;
    const profile = {
        "profile": {
            "organization": orgName
        }
    };

    await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users/${oktaUserId}`,
        method: 'POST',
        headers: oktaHeaders,
        data: profile
    });
}

async function orgDelete(req) {
    var oktaUserId = await getUser(oktaHeaders);
    const profile = {
        "profile": {
            "organization": null
        }
    }

    const allUsers = await getOrg(oktaHeaders);
    console.log(allUsers);
    postToOkta(oktaHeaders, profile, oktaUserId);    
}

export { orgCreate, orgDelete };
