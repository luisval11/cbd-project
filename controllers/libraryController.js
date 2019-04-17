const Users = require('../models/users');
const ErrorHandler = require('../controllers/errorController');
const AuthController = require('./authencationController');


exports.getMyLibrary = function (req, res) {

  var libraries = "";
  if (req.query.filter && req.query.filter.length) {
    for (var x in req.query.filter)
      if (req.query.filter[x] === "music" || req.query.filter[x] === "films" || req.query.filter[x] === "videogames")
        libraries += req.query.filter[x].toString() + " ";
  } else if (req.query.filter && (req.query.filter === "music" || req.query.filter === "films" || req.query.filter === "videogames"))
    libraries = req.query.filter;
  else
    libraries = "music films videogames";

  AuthController.principalUtils(req, user => {
    Users.findOne({username: user.username}, libraries, (err, data) => {
      if (err)
        res.status(400).json(ErrorHandler.handleError(err, null));
      else if (data === null)
        res.status(400).json(ErrorHandler.handleError(null, "You're not logged in or you have no libraries"));
      else
        res.json(data);
    })
  });

};
