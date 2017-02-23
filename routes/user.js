var express = require('express');
var router = express.Router();
const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');


/* GET users listing. */

//doing this with axios call in a react component instead:

// router.get('/', authHelpers.loginRequired, function(req, res, next) {
//   res.render('user/index', {
//     user: req.user.dataValues
//   });
// });

module.exports = router;
