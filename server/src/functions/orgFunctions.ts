const axios = require('axios');

async function getUser(headers) {
    const user = await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users/me`,
        method: 'GET',
        headers: headers
    });
    
    const userId = user.data.id;

    return userId;
}

async function getOrg(headers) {
    const currentUser = await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users/me`,
        method: 'GET',
        headers: headers
    });

    var orgName = currentUser.data.profile.organization;
    return orgName;
}

async function getOrgUsers(headers) {
    const orgName = await getOrg(headers);

    const orgUsers = await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users?search=profile.organization+eq+\"${orgName}\"`,
        method: 'GET',
        headers: headers
    });

    return orgUsers;
}

async function orgCreate(req, headers) {
    const oktaUserId = await getUser(headers);
    const orgName = req.body.organization;
    const profile = {
        "profile": {
            "organization": orgName
        }
    };

    const newOrg = await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users/${oktaUserId}`,
        method: 'POST',
        headers: headers,
        data: profile
    });

    return newOrg;
}

async function orgDelete(headers) {
    const allUsers = await getOrgUsers(headers);

    const profile = {
        "profile": {
            "organization": null
        }
    }

    const users = allUsers.data;

    for (var i = 0; i < users.length; i++) {
        var oktaUserId = users[i].id;
        postToOkta(headers, profile, oktaUserId);
    }

    const confirmDelete = await getOrg(headers);

    if (confirmDelete != null) {
        throw Error("Error while deleting organization.")
    }
}

async function postToOkta(headers, profile, oktaUserId) {
    await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users/${oktaUserId}`,
        method: 'POST',
        headers: headers,
        data: profile
    });
}

export { orgCreate, orgDelete };
