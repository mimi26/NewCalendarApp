const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');

const options = {};

init();

passport.use(new LocalStrategy(options, (username, passport, done) => {
  //since username is unique, use findOne to find exact match to username
    models.User.findOne({
    where: { username }
  })
  .then((user) => {
    console.log(user);
    //check if username exists
    if (!user) {
      return done(null, false);
    }
    //if username exists, check if password entered matches
    if (!authHelpers.comparePass(password, user.dataValues.password)) {
      return done(null, false);
    } else {
      return done(null, user.dataValues);
    }
  })
  .catch((err) => { return done(err); });
}));

module.exports = passport;
