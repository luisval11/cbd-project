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

exports.get = function (req, res) {

  Users.aggregate([
      {$match: {}},
      {$unwind: {path: '$music', preserveNullAndEmptyArrays: true}},
      {$unwind: {path: '$films', preserveNullAndEmptyArrays: true}},
      {$unwind: {path: '$videogames', preserveNullAndEmptyArrays: true}},
      {
        $group: {
          _id: 1,
          music: {$addToSet: '$music'},
          films: {$addToSet: '$films'},
          videogames: {$addToSet: '$videogames'}
        }
      }
    ]
  ).exec((err, data) => {
    if (err) {
      res.status(400).send(ErrorHandler.handleError(err, null));
    } else if (!data)
      res.status(200).json([]);
    else
      res.status(200).json(data);

  });

};
