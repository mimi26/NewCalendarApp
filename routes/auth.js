const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

//do we need to do something here to render.get react register component?
// router.get('/register', authHelpers.loginRedirect, (req, res) => {
//   res.render('auth/register');
// });

router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    console.log('registration successful');
  })
  .catch((err) => { res.status(500).json({ status: 'error'}); });
});

//do we need to do something here to render.get react login component?
// router.get('/login', authHelpers.loginRedirect, (req, res) => {
//   res.render('auth/login');
// });

router.post('/login', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth/login',
  failureFlash: true
  });
 );

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;