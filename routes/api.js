const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authencationController');
const LibraryController = require('../controllers/libraryController');


// ########## LOGIN ################
router.get('/login', AuthController.login);
router.get('/logout', AuthController.logut);
router.get('/getPrincipal', AuthController.principal);


// ############### LIBRARY ##############

router.get('/user/library', LibraryController.getMyLibrary);
router.get('/library', LibraryController.get);
// TODO:
router.post('/user/library', LibraryController.getMyLibrary);
router.put('/user/library', LibraryController.getMyLibrary);
router.delete('/user/library', LibraryController.getMyLibrary);

module.exports = router;

