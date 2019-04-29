const Users = require('../models/users');
const ErrorHandler = require('../controllers/errorController');
const AuthController = require('./authenticationController');


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

exports.findOne = function (req, res) {
  const libraryId = req.params.id;

  if (new RegExp('\\$').test(libraryId.toString()))
    res.status(400).json(ErrorHandler.handleError(null, "Nice try, but you can't use $ in urls"));
  else
    Users.findOne({$or: [{music: {$elemMatch: {_id: libraryId}}}, {films: {$elemMatch: {_id: libraryId}}}, {videogames: {$elemMatch: {_id: libraryId}}}]},
      'music films videogames', (err, users) => {
        if (err)
          res.status(400).json(ErrorHandler.handleError(err, null));
        else if (users == null)
          res.status(400).json(ErrorHandler.handleError(null, "Library item not found"));
        else {
          var sol;
          // users.music.id(libraryId) ? users.music.id(libraryId).type = "music" : users.films.id(libraryId) ? users.films.id(libraryId) : users.videogames.id(libraryId);

          if (users.music.id(libraryId)) {
            sol = users.music.id(libraryId)._doc;
            sol['type'] = "music";
          } else if (users.films.id(libraryId)) {
            sol = users.films.id(libraryId)._doc;
            sol['type'] = "films";
          } else {
            sol = users.videogames.id(libraryId)._doc;
            sol['type'] = "videogames";
          }
          res.json(sol)
        }
      });
};

exports.get = function (req, res) {

  const search = req.query.search;
  const mark = req.query.mark;
  const library = req.query.library;

  function creaDict(search, mark, library) {
    var dict = {};
    if (search && !new RegExp('\\$').test(search.toString()))
      dict['$or'] = [{[library + 'author']: {$regex: search.toString(), $options: 'i'}},
        {[library + 'title']: {$regex: search.toString(), $options: 'i'}},
        {[library + 'description']: {$regex: search.toString(), $options: 'i'}},
      ];
    if (mark && !new RegExp('\\$').test(mark.toString()))
      dict[library + 'mark'] = mark.toString();

    return dict;
  }

  if (library !== 'music' && library !== 'films' && library !== 'videogames')
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
        },

      ]
    ).exec((err, data) => {
      if (err) {
        res.status(400).send(ErrorHandler.handleError(err, null));
      } else if (!data)
        res.status(200).json([]);
      else
        res.status(200).json(data);

    });
  else

    Users.aggregate([
        {$match: {}},
        {$unwind: {path: '$' + library, preserveNullAndEmptyArrays: true}},
        {$match: creaDict(search, mark, library + ".")},
        {
          $group: {
            _id: 1,
            [library]: {$addToSet: '$' + library},
          }
        },

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

exports.post = function (req, res) {
  const library = req.params.library.toString();
  delete req.body._id;

  if (!(library === "music" || library === "films" || library === "videogames"))
    res.status(400).send(ErrorHandler.handleError(null, "Library type not found"));
  else {
    AuthController.principalUtils(req, user => {
      Users.updateOne({username: user.username}, {$push: {[library]: req.body}}, {runValidators: true}, (err, data) => {
        if (err)
          res.status(400).json(err);
        else
          res.json(data);

      })
    });
  }

};

exports.put = function (req, res) {
  const library = req.params.library.toString();

  if (!(library === "music" || library === "films" || library === "videogames"))
    res.status(400).send(ErrorHandler.handleError(null, "Library type not found"));
  else {
    AuthController.principalUtils(req, user => {
      Users.updateOne({
        username: user.username,
        [library + '._id']: req.body._id
      }, {$set: {[library + '.$']: req.body}}, {runValidators: true}, (err, data) => {
        if (err)
          res.status(400).json(err);
        else
          res.json(data);

      })
    });
  }

};

exports.delete = function (req, res) {
  const libraryId = req.params.libraryId

  AuthController.principalUtils(req, user => {
    Users.updateOne({username: user.username}, {
      $pull: {
        music: {_id: libraryId},
        films: {_id: libraryId},
        videogames: {_id: libraryId},
      }
    }, {runValidators: true}, (err, data) => {
      if (err)
        res.status(400).json(err);
      else
        res.json(data);

    })
  });

};
