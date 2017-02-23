const bcrypt = require('bcryptjs');
const models = requir('../db/models/index');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function () {
  loginRedirect(req, res, next) {
    if (req.user) return res.status(401).json(
      { status: 'You are already logged in' }
      );
      return next();
    }
  }

//does req.body serve the same function if coming from react componenet?
//how to do this with data from react?
//or, should I be doing this in react?
function createUser(req, res) {
  const salt = bcrypt.genSaltSyc();
  const hash = bcrypt.hashSync(req.body.password, salt);

  return models.User.cretae({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }).then(() => {
    res.redirect('/')
  });
}

function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });

  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
  createUser
}


