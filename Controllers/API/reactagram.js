//Reactagram API router

const router = require('express').Router();
const Reactagram = require('../../Models/reactagram.js')


router.get('/posts', Reactagram.allPosts, (req, res) => {
  const allPosts = res.locals.data;
  res.json(allPosts);
});

router.get('/users/:id', Reactagram.user, (req, res) => {
  const userObj = res.locals.user;
  res.json(userObj);
});

module.exports = router;