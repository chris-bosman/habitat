const axios = require('axios');

async function orgFunctions(req, operation) {
    var org;
    const orgName = req.body.organization

    const oktaHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `SSWS ${process.env.OKTA_API_TOKEN}`
    }

    const user = await axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users/me`,
        method: 'GET',
        headers: oktaHeaders
    })

    const userId = user.data.id;
    if (operation == "create") {
        org = orgName;
    } else if (operation == "delete") {
        org = null;
    }

    const profile = {
        "profile": {
            "organization": org
        }
    }

    axios({
        url: `https://${process.env.OKTA_DOMAIN}/api/v1/users/${userId}`,
        method: 'POST',
        headers: oktaHeaders,
        data: profile
    });
}

export { orgFunctions };
