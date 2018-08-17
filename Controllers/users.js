const router = require('express').Router();
const User = require('../models/User');
const TokenService = require('../services/TokenService');

router.get('/', (req, res) => {
  res.json({user: 'it worked'});
});

// note how res.locals is returned in both creating a user and logging in
router.post('/', User.create, (req, res) => {
  res.json({token: res.locals.token, user: res.locals.user})
});

// if the user didn't get created thrown an error
// else include the user and token in the response
router.post('/login', User.login, (req, res) => {
  if (!res.locals.user) {
    res.status(401).json({err: 'Login Failed'})
  } else {
    const { password_digest, ...user } = res.locals.user;
    res.json({token: res.locals.token, user});
  }
});

module.exports = router;
