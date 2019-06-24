import * as express from 'express';
import * as multer from 'multer';
import { createResource } from './functions/resourceFunctions';
import { orgCreate, orgDelete } from './functions/orgFunctions';

const upload = multer();
const router = express.Router();

router.get('/', (req, res, next) => {
    setTimeout(function() {
        res.status(200).json({'message': 'Test Successful!'})
    }, 2000);
});

router.get('/api/v1/health', (req, res, next) => {
    res.status(200);
    res.send("Healthy");
});

router.post('/api/v1/organizations/create', (req, res, next) => {
    var orgName = req.body.organization;
    var newOrg = orgCreate(req);
    newOrg.then(newOrg => {
        if (newOrg.data.profile.organization == orgName) {
            res.status(200).json({'message': `Organization "${orgName}" successfully created!`});
        } else {
            throw Error(`There was an error in creating the organization: ${res.statusMessage}`);
        }
    }).catch(err => {
        res.status(400).send(err.statusMessage);
    });
});

router.post('/api/v1/organizations/delete', (req, res, next) => {
    var deleteOrg = orgDelete();
    deleteOrg.then(deleteOrg => {
        res.status(200).json({'message': `The organization has been successfully deleted.`});
    }).catch(err => {
        res.status(400).send(err.statusMessage);
    });
});

router.post('/api/v1/tfstate', upload.none(), (req, res, next) => {
    var newResource = createResource(req);
    newResource.then(newResource => {
        console.log(newResource);
        res.status(200).json({'message': 'Success'});
    }).catch(err => {
        res.status(400).send(err.statusMessage);;
    });
});

export default router;
