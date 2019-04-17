const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authencationController');
const LibraryController = require('../controllers/libraryController');
const UserController = require('../controllers/userController');

// ########## LOGIN ################
router.get('/login', AuthController.login);
router.get('/logout', AuthController.logut);
router.get('/getPrincipal', AuthController.principal);


// ############### LIBRARY ##############

router.get('/user/library', LibraryController.getMyLibrary);
router.get('/library', LibraryController.get);
router.post('/user/library/:library', LibraryController.post);
router.delete('/user/library/:libraryId', LibraryController.delete);
router.put('/user/library/:library', LibraryController.put);


//################ USER #################

router.get('/user', UserController.get);
router.post('/user/:user', UserController.post);
router.put('/user/:userId', UserController.put);
router.delete('/user/:userId', UserController.delete);

module.exports = router;

