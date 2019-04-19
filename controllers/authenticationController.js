const Users = require('../models/users');
const sha256 = require('crypto-js/sha256'); //npm install crypto-js
const jwt = require('jsonwebtoken'); //npm install jsonwebtoken --save
const ErrorHandler = require('../controllers/errorController');

const secret_key = 'thisWillBeSecret';

exports.login = function (req, res) {
  if (!req.headers.authorization)
    res.status(400).json(ErrorHandler.handleError(err, null));
  // else if (parseCookies(req)['auth_token'] != null && parseCookies(req)['auth_token'] !== "") //TODO: para impedir que se logee dos veces, no se por qué no me funciona el borrado de cookie en el arc
  //     res.status(400).json("You're logged in");
  else {
    const base64credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64credentials, 'base64').toString('ascii');
    var [username, password] = credentials.split(':');
    if (password === null)
      password = "";
    const hashedPassword = sha256(password).toString();
    Users.findOne({'username': username}, (err, user) => {
      if (err)
        res.status(400).json(ErrorHandler.handleError(err, null));
      else if (!user)
        res.status(401).json(ErrorHandler.handleError(null, "Invalid credentials"));
      else if (user.password !== hashedPassword)
        res.status(401).json(ErrorHandler.handleError(null, "Invalid credentials."));
      else {
        const token = jwt.sign({id: user._id}, secret_key);
        res.cookie("auth_token", token);
        res.status(200).send({token: token});
      }
    });
  }
};


exports.logut = function (req, res) {

  res.clearCookie("auth_token");

  res.status(200).send({});
};

exports.principal = function (req, res) {
  getPrincipal(req, (user) => {
    if (user instanceof Users) {
      res.status(200).json(user);
    } else {
      res.status(401).json(user);
    }
  });
};

exports.checkIfUsers = function (req, res, onDone) {
  checkPrincipalRole(req, res, "USER", onDone);
};

exports.checkIfOwner = function (req, res, onDone) {
  checkPrincipalRole(req, res, "OWNER", onDone);
};

exports.checkIfAdmin = function (req, res, onDone) {
  checkPrincipalRole(req, res, "ADMIN", onDone);
};

// Autenticathion Utils
function checkPrincipalRole(req, res, role, onDone) {
  getPrincipal(req, user => {
    if (user.role == role) {
      onDone(user);
    } else {
      res.status(401).json("Restricted area");
    }
  })
}

function parseCookies(request) {
  var list = {},
    rc = request.headers.cookie;

  rc && rc.split(';').forEach(function (cookie) {
    var parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
}

exports.parseCookies = parseCookies;

exports.principalUtils = function (req, onDone) {
  getPrincipal(req, user => {
    onDone(user);
  });
};

function getPrincipal(req, onDone) {
  const auth_token = parseCookies(req)['auth_token'];
  if (auth_token != null) {
    jwt.verify(auth_token, secret_key, (err, decoded) => {
      if (err) {
        onDone("Your token is invalid, please log in again");
      } else {
        Users.findOne({'_id': decoded.id}, (err, user) => {
          if (err)
            onDone("Can not commit that operation");
          else if (user == null)
            onDone("Your token is invalid, please log in again");
          else {
            onDone(user);
          }
        });
      }
    })
  } else {
    onDone("auth_token not found");
  }
}
