const bcrypt = require('bcrypt');
const models = require('../db/models/index');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    { status: 'You are already logged in' }
  );

  return next();
}

//does req.body serve the same function if coming from react componenet?
//how to do this with data from react?
//or, should I be doing this in react?
function createUser(req, res, next) {
  const salt = bcrypt.genSaltSyc();
  const hash = bcrypt.hashSync(req.body.password, salt);
 console.log(req);
  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }).then(() => {
    console.log('registration successful');
  }).catch(err => { console.log(err) });
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


