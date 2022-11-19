var express = require('express');
var router = express.Router();

const Controller = require("../controllers/log.controller")

//endpoints

router.post('/login', Controller.login)
router.post('/register', Controller.createUser)
router.get('/credentials', Controller.findUserCredentials)
router.get('/oudivision', Controller.findOUdivision)
router.put('/credentials', Controller.updateCredentials)
router.post('/credentials', Controller.createCredentials)
router.put('/credentials/archive', Controller.archiveCredential)
router.get('/users', Controller.findUserAccess)
router.put('/users', Controller.updateUserRole)
router.get('/editaccess', Controller.findAllUsers);
router.get('/userOU/:data', Controller.findUserOUdivision);


module.exports = router;
