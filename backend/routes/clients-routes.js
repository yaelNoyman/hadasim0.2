const express = require('express');
const { check } = require('express-validator');
const bodyParser = require('body-parser');
const clientFunctions = require('../Controllers/client-controller')

const router = express.Router();


router.get('/allClients', clientFunctions.getAllClients);

router.get('/getClient/:cid', clientFunctions.getClientById);

router.post('/addClient',
    [
        check('name').not().isEmpty(),
        check("id").isIdentityCard(),
        check("address").not().isEmpty(),
        check("birthday").isDate(),
        check("phone").isMobilePhone(),
        check("mobilePhone").isMobilePhone()
    ]
    , clientFunctions.createClient)


router.post('updateClient/',
    [
        check('name').not().isEmpty(),
        check("id").isIdentityCard(),
        check("address").not().isEmpty(),
        check("birthday").isDate(),
        check("phone").isMobilePhone(),
        check("mobilePhone").isMobilePhone()
    ]
    , clientFunctions.updateClientById)

router.delete('deleteClient/:cid', clientFunctions.deleteClientById)

module.exports = router;