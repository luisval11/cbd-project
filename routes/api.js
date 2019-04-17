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
router.post('/user/library/:library', LibraryController.post);
router.delete('/user/library/:libraryId', LibraryController.delete);
router.put('/user/library/:library', LibraryController.put);


module.exports = router;

