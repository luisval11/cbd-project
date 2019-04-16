const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authencationController');


// ########## LOGIN ################
router.get('/login', AuthController.login);
router.get('/logout', AuthController.logut);
router.get('/getPrincipal', AuthController.principal);


module.exports = router;

