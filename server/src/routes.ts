import * as express from 'express';
import * as multer from 'multer';
import { createResource } from './functions/createResource';
import { createOrg } from './functions/createOrg';

const upload = multer();
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200);
    res.send("Hello World");
});

router.get('/api/v1/health', (req, res, next) => {
    res.status(200);
    res.send("Healthy");
});

router.post('/api/v1/organizations', (req, res, next) => {
    var newOrg = createOrg(req);
    newOrg.then(newOrg => {
        res.status(200).json({'message': 'Arrived'});
    }).catch(err => {
        res.status(400).send(err.message);
    })
})

router.post('/api/v1/tfstate', upload.none(), (req, res, next) => {
    var newResource = createResource(req);
    newResource.then(newResource => {
        res.status(200).json({'message': 'Success'});
    }).catch(err => {
        res.status(400).send(err.message);
    });
});

export default router;
