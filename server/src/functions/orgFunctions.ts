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
    return orgName;
}

async function getOrgUsers(oktaHeaders) {
    const orgName = await getOrg(oktaHeaders);

    const orgUsers = await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users?search=profile.organization+eq+\"${orgName}\"`,
        method: 'GET',
        headers: oktaHeaders
    });

    return orgUsers;
}

async function orgCreate(req) {
    const oktaUserId = await getUser(oktaHeaders);
    const orgName = req.body.organization;
    const profile = {
        "profile": {
            "organization": orgName
        }
    };

    const newOrg = await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users/${oktaUserId}`,
        method: 'POST',
        headers: oktaHeaders,
        data: profile
    });

    

    return newOrg;
}

async function orgDelete() {
    const allUsers = await getOrgUsers(oktaHeaders);

    const profile = {
        "profile": {
            "organization": null
        }
    }

    const users = allUsers.data;

    for (var i = 0; i < users.length; i++) {
        var oktaUserId = users[i].id;
        const deleteOrg = await postToOkta(oktaHeaders, profile, oktaUserId);
        return deleteOrg;
    }

    const confirmDelete = await getOrg(oktaHeaders);

    if (confirmDelete != null) {
        throw Error("Error while deleting organization.")
    }
}

async function postToOkta(oktaHeaders, profile, oktaUserId) {
    await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users/${oktaUserId}`,
        method: 'POST',
        headers: oktaHeaders,
        data: profile
    });
}

export { orgCreate, orgDelete };
