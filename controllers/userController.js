const sha256 = require('crypto-js/sha256');
const User = require('../models/users');
const ErrorHandler = require('../controllers/errorController');
const AuthController = require('./authenticationController');

exports.get = function (req, res) {
  User.find({}, (err, users) => {
    res.json(users);
  });
};

exports.post = function (req, res) {
  //Delete id from angular and hash password
  delete req.body._id;
  req.body.password = sha256(req.body.password);
  //Create and save the user
  User.create(req.body, (err, user) => {
    if(err) {
      res.status(400).json(ErrorHandler(err, null));
    } else {
      res.status(200).json(user);
    }
  });
};

exports.put = function (req, res) {
  AuthController.principalUtils(req, user => {
    if (user == null) {
      //If user logged is null
      res.status(400).send(ErrorHandler.handleError(null, ""));
    } else if (req.body._id !== user._id) {
      //If an user tries to modify another user
      res.status(400).send(ErrorHandler.handleError(null,""));
    } else {
      //Not editable
      req.body._id = user._id;
      req.body.username = user.username;
      //Hash password if distinct
      if(req.body.password !== user.password) {
        req.body.password = sha256(req.body.password);
      }
      //Save user
      user.set(req.body);
      user.save(err => {
        if(err) {
          res.status(400).send(ErrorHandler.handleError(null,""))
        } else {
          user.password = undefined;
          res.json(user);
        }
      });
    }
  });
};

exports.delete = function (req, res) {
  const username = req.params.username;

  User.findOneAndDelete({username: username}, (err, ) => {
    if (err) {
      res.status(400).send(ErrorHandler.handleError(err, null));
    } else {
      res.status(200).send({});
    }
  });
};
